"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SquareMousePointer, ClipboardCheck } from "lucide-react";
import { useSession } from "@/context/context.sesion";
import { toast } from "sonner";
import { applyOffer, deleteApplyOffer, toggleApply } from "../lib/applyOffer";
import { useApplyOfferEventsStore } from "@/context/applyOffer.context";
import { supabase } from "@/utils/supabase/supabaseClient";
import { createNotification } from "@/lib/notifications";
import nPayload from "@/content/notitications/notications-entity.json";
export function ButtonApplyOffer({
  offer_id,
  user_id,
  hidden_btn_apply
}: {
  className?: string;
  offer_id: number;
  user_id: string;
  hidden_btn_apply: boolean;
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
      await emitNotification(offer_id);
    }

    if (!success) {
      setHasApply(hasApply);
      emitApplyOfferEvent(offer_id, hasApply ? "apply" : "withdraw", user.id);
      toast.error("Ocurrió un error, intenta nuevamente.");
    } else {
      toast.success(
        hasApply
          ? "Has eliminado tu aplicación de la oferta."
          : "¡Has aplicado a la oferta!"
      );
    }
  }

  async function emitNotification(offer_id: number) {
    const { data } = await supabase
      .from("offers")
      .select("user_id")
      .eq("id", offer_id)
      .single();

    const offerOwnerId = data?.user_id;

    if (offerOwnerId && offerOwnerId !== user?.id) {
      await createNotification({
        user_id: offerOwnerId,
        actor_id: user?.id || "user",
        type: nPayload[2].type,
        entity_id: offer_id.toString(),
        entity_type: nPayload[2].entity_type,
        content: `${user?.full_name || "A alguien"} Aplico a tu oferta`,
        url: `/profile-user/offers?page=list_aplications&offer_id=${offer_id}&user_id=${offerOwnerId}`,
        read: false,
      });
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
      className={`${hidden_btn_apply ? "hidden" : "flex"}  items-center gap-1 cursor-pointer ${isApply}`}
      disabled={loading}
    >
      {icon} {loading ? buttonTextLoading : textBtn}
    </Button>
  );
}
