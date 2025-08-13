"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SquareMousePointer, ClipboardCheck } from "lucide-react";
import { useSession } from "@/context/context.sesion";
import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "sonner";
import { applyOffer, deleteApplyOffer, toggleApply } from "../lib/applyOffer";

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

    // Comprobación inicial
    useEffect(() => {
        toggleApply(offer_id, user_id)
            .then(setHasApply)
            .finally(() => setLoading(false));
    }, [offer_id, user_id]);

    // Suscripción en tiempo real
    useEffect(() => {
        if (!user) return;
        const channel = supabase
            .channel(`apply-offers-${offer_id}`)
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "offers_applications" },
                async () => {
                    const updated = await toggleApply(offer_id, user.id);
                    setHasApply(updated);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, offer_id]);

    // Acción del botón
    async function handleClick() {
        if (!user) return toast.error("Debes iniciar sesión para aplicar.");
        // if (user_id === user.id)
        //   return toast.error("¡No puedes aplicar a tu propia oferta!");

        setLoading(true);

        if (hasApply) {
            // Eliminar aplicación
            const { success } = await deleteApplyOffer(offer_id, user.id);
            if (success) {
                toast.success("Has eliminado tu aplicación.");
                setHasApply(false);
            } else {
                toast.error("No se pudo eliminar tu aplicación.");
            }
        } else {
            // Aplicar a la oferta
            const { success } = await applyOffer(offer_id, user.id);
            if (success) {
                toast.success("¡Has aplicado a la oferta!");
                setHasApply(true);
            } else {
                toast.error("No se pudo aplicar a la oferta.");
            }
        }

        setLoading(false);
    }

    const textBtn = hasApply ? "Aplicaste a esta oferta" : "Aplicar a la oferta";
    const isApply = hasApply
        ? "bg-green-500 text-white hover:bg-green-600"
        : "";
    const icon = hasApply ? (
        <ClipboardCheck className="w-4 h-4" />
    ) : (
        <SquareMousePointer className="w-4 h-4" />
    );

    return (
        <Button
            onClick={handleClick}
            className={`flex items-center gap-1 ${isApply}`}
            disabled={loading}
        >
            {icon} {textBtn}
        </Button>
    );
}
