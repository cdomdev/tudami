"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/context/context.sesion";
import { isOffersSaved, toggleSave } from "../lib/saveOffer";
import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "sonner";
import { Bookmark, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export function ButtonSaveOffer({ offer_id }: { offer_id: number }) {
  const { user } = useSession();
  const [isSaved, setIsSaved] = useState(false);

  // Verifica al montar si ya está guardado
  useEffect(() => {
    if (!user) return;
    isOffersSaved(offer_id, user.id).then(setIsSaved);
  }, [user, offer_id]);

  // Suscripción en tiempo real
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel(`save-offers-${offer_id}`)
      .on(
        "postgres_changes",
        { event: '*', schema: 'public', table: 'offers_saveds' },
        async () => {
          const updated = await isOffersSaved(offer_id, user.id);
          setIsSaved(updated);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, offer_id]);

  const handleSave = async () => {
    if (!user) return;
    const { saved } = await toggleSave(offer_id, user.id);
    if (saved) toast.success("Se guardó la oferta en tu perfil");
    else toast.error("Se eliminó la oferta de tus guardados");
    setIsSaved(saved);
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          {!isSaved ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className={`cursor-pointer 
              bg-gray-200 text-gray-800 hover:bg-green-500 hover:text-white dark:hover:bg-green-500 px-4 py-2 rounded-md transition-colors duration-200 `}
            >
              <Bookmark className="h-5 w-5" />
              <span className="sr-only">Guardar oferta en perfil</span>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className={`cursor-pointer 
          bg-red-500  hover:bg-red-600 text-white dark:hover:bg-red-700  px-4 py-2 rounded-md transition-colors duration-200 hover:text-white `}
            >
              <Trash className="h-5 w-5" />
              <span className="sr-only">Eliminar oferta de guardados</span>
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent
          side="top"
          align="center"
        >
          {isSaved
            ? "Eliminar oferta de guardados"
            : "Guardar oferta en perfil"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
