"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SquareMousePointer, ClipboardCheck } from "lucide-react";
import { useSession } from "@/context/context.sesion";
import { toast } from "sonner";
import { applyOffer, deleteApplyOffer, toggleApply } from "../lib/applyOffer";
import { useApplyOfferEventsStore } from "@/context/applyOffer.context";

export function ButtonApplyOffer({
  offer_id,
  user_id,
}: {
  offer_id: number;
  user_id: string;
}) {
  const [hasApply, setHasApply] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useSession();
  const { emitApplyOfferEvent } = useApplyOfferEventsStore();

  // Comprobación inicial
  useEffect(() => {
    if (!user) return;
    toggleApply(offer_id, user.id)
      .then(setHasApply)
      .finally(() => setLoading(false));
  }, [offer_id, user]);

  async function handleClick() {
    if (!user) return toast.error("Debes iniciar sesión para aplicar.");
    if (user.id === user_id)
      return toast.error("No puedes aplicar a tus propias ofertas.");

    const actionToEmit = hasApply ? "withdraw" : "apply";
    emitApplyOfferEvent(offer_id, actionToEmit, user.id); 
    setHasApply(!hasApply);

    let success = false;
    if (hasApply) {
      const res = await deleteApplyOffer(offer_id, user.id);
      success = res.success;
    } else {
      const res = await applyOffer(offer_id, user.id);
      success = res.success;
    }

    if (!success) {
      setHasApply(hasApply);
      emitApplyOfferEvent(offer_id, hasApply ? "apply" : "withdraw", user.id);
      toast.error("Ocurrió un error, intenta nuevamente.");
    } else {
      toast.success(
        hasApply ? "Has eliminado tu aplicación de la oferta." : "¡Has aplicado a la oferta!"
      );
    }
  }

  const textBtn = hasApply ? "Aplicaste a esta oferta" : "Aplicar a la oferta";
  const isApply = hasApply ? "bg-green-500 text-white hover:bg-green-600" : "";
  const buttonTextLoading = hasApply ? "Eliminando..." : "Aplicando...";

  const icon = hasApply ? (
    <ClipboardCheck className="w-4 h-4" />
  ) : (
    <SquareMousePointer className="w-4 h-4" />
  );

  return (
    <Button
      onClick={handleClick}
      className={`flex items-center gap-1 cursor-pointer ${isApply}`}
      disabled={loading}
    >
      {icon} {loading ? buttonTextLoading : textBtn}
    </Button>
  );
}
