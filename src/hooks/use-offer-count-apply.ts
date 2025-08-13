import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useApplyOfferEventsStore } from "@/context/applyOffer.context";

export function useOfferApplicationsCount(offer_id: number) {
  const [count, setCount] = useState<number>(0);
  const { onApplyOfferEvent } = useApplyOfferEventsStore();

  const refetchCount = useCallback(async () => {
    try {
      const { count: newCount, error } = await supabase
        .from("offers_applications")
        .select("*", { count: "exact", head: true })
        .eq("offer_id", offer_id);

      if (error) {
        console.error(`[useOfferApplicationsCount] Error:`, error);
        return;
      }

      setCount(newCount ?? 0);
    } catch (err) {
      console.error(`[useOfferApplicationsCount] Error inesperado:`, err);
    }
  }, [offer_id]);

  useEffect(() => {
    refetchCount();
  }, [refetchCount]);

  // 🔹 Escucha eventos locales y actualiza el contador al instante
  useEffect(() => {
    const unsubscribe = onApplyOfferEvent((event) => {
      if (event.offer_id === offer_id) {
        setCount((prev) =>
          event.action === "apply" ? prev + 1 : Math.max(prev - 1, 0)
        );
      }
    });
    return unsubscribe;
  }, [offer_id, onApplyOfferEvent]);

  // 🔹 Escucha en tiempo real desde Supabase para sincronizar

  useEffect(() => {
    const channel = supabase
      .channel(`offer-applications-${offer_id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "offers_applications",
          filter: `offer_id=eq.${offer_id}`,
        },
        () => {
          setTimeout(refetchCount, 500);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [offer_id, refetchCount]);

  return count;
}
