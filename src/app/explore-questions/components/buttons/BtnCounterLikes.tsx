import { supabase } from "@/utils/supabase/supabaseClient";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";

export function BtnCounterLikes({
  question_id,
  count,
  setCount,
}: {
  question_id: number;
  count: number;
  setCount: (val: number) => void;
}) {
  useEffect(() => {
    const channel = supabase
      .channel(`question-likes-${question_id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "question_likes",
          filter: `question_id=eq.${question_id}`,
        },
        async () => {
          const { count } = await supabase
            .from("question_likes")
            .select("*", { count: "exact", head: true })
            .eq("question_id", question_id);

          setCount(count ?? 0);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [question_id, setCount]);

  return (
    <Button
      variant="ghost"
      className="hover:bg-none hover:bg-transparent dark:hover:bg-transparent "
    >
      <ThumbsUp /> {count}
    </Button>
  );
}
