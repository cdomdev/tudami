import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useLikeEventsStore } from "@/context/likeEventsContext";

export function useLikesChannelHybrid(question_id: number) {
  const [count, setCount] = useState<number>(0);
  const { onLikeEvent } = useLikeEventsStore();

  const refetchCount = useCallback(async () => {
    try {
      const { count: newCount, error } = await supabase
        .from("question_likes")
        .select("*", { count: "exact", head: true })
        .eq("question_id", question_id);

      if (error) {
        console.error(`[useLikesChannelHybrid] Error:`, error);
        return;
      }

      const finalCount = newCount ?? 0;
      setCount(finalCount);
    } catch (error) {
      console.error(`[useLikesChannelHybrid] Error inesperado:`, error);
    }
  }, [question_id]);

  useEffect(() => {
    refetchCount();
  }, [refetchCount]);

  useEffect(() => {
    const unsubscribe = onLikeEvent((event) => {
      if (event.question_id === question_id) {
        setCount((prevCount) => {
          const newCount =
            event.action === "add" ? prevCount + 1 : Math.max(0, prevCount - 1);
          return newCount;
        });
        setTimeout(refetchCount, 500);
      }
    });

    return unsubscribe;
  }, [question_id, onLikeEvent, refetchCount]);

  useEffect(() => {
    const channel = supabase
      .channel(`hybrid-likes-${question_id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "question_likes",
          filter: `question_id=eq.${question_id}`,
        },
        () => {
          setTimeout(() => {
            refetchCount();
          }, 1000);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [question_id, refetchCount]);

  return count;
}
