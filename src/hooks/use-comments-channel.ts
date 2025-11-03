import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/supabaseClient";

export function useCommentsChannel(question_id: number) {
  const [count, setCount] = useState<number>(0);

  // Obtener el conteo inicial
  useEffect(() => {
    let isMounted = true;
    async function fetchCount() {
      const { count } = await supabase
        .from("question_comments")
        .select("*", { count: "exact", head: true })
        .eq("question_id", question_id);
      if (isMounted && typeof count === "number") setCount(count);
    }
    fetchCount();
    return () => {
      isMounted = false;
    };
  }, [question_id]);

  // Suscribirse al canal de cambios
  useEffect(() => {
    const channel = supabase
      .channel(`question-comments-${question_id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "question_comments",
          filter: `question_id=eq.${question_id}`,
        },
        async () => {
          // const { count } = await supabase
          //   .from("question_comments")
          //   .select("*", { count: "exact", head: true })
          //   .eq("question_id", question_id);
          // setCount(count ?? 0);
          () => {
            setCount(prev => prev +1);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [question_id]);

  return count;
}
