import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react"
import { supabase } from "@/lib/supabase"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export function BtnCounterComment({ question_id, count, setCount }: { question_id: number, count: number, setCount: (val: number) => void }) {
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
          const { count } = await supabase
            .from("question_comments")
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
    <>
      <Dialog >
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="hover:bg-none hover:bg-transparent cursor-pointer">
            <MessageCircle className="h-8 w-8 text-gray-500 dark:text-white" />{count}
            <span className="sr-only">open dialog</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-2xl lg:min-w-4xl overflow-y-auto max-h-1/3">
          <DialogHeader>
            <DialogTitle className="hidden">Comentarios</DialogTitle>
            <DialogDescription>
              Lista de comentarios
            </DialogDescription>
          </DialogHeader>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi labore animi exercitationem rem deserunt? Similique ipsam voluptatibus sint. Placeat excepturi esse odit autem, consequatur enim atque praesentium veritatis recusandae quibusdam!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi labore animi exercitationem rem deserunt? Similique ipsam voluptatibus sint. Placeat excepturi esse odit autem, consequatur enim atque praesentium veritatis recusandae quibusdam!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi labore animi exercitationem rem deserunt? Similique ipsam voluptatibus sint. Placeat excepturi esse odit autem, consequatur enim atque praesentium veritatis recusandae quibusdam!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi labore animi exercitationem rem deserunt? Similique ipsam voluptatibus sint. Placeat excepturi esse odit autem, consequatur enim atque praesentium veritatis recusandae quibusdam!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi labore animi exercitationem rem deserunt? Similique ipsam voluptatibus sint. Placeat excepturi esse odit autem, consequatur enim atque praesentium veritatis recusandae quibusdam!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi labore animi exercitationem rem deserunt? Similique ipsam voluptatibus sint. Placeat excepturi esse odit autem, consequatur enim atque praesentium veritatis recusandae quibusdam!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi labore animi exercitationem rem deserunt? Similique ipsam voluptatibus sint. Placeat excepturi esse odit autem, consequatur enim atque praesentium veritatis recusandae quibusdam!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi labore animi exercitationem rem deserunt? Similique ipsam voluptatibus sint. Placeat excepturi esse odit autem, consequatur enim atque praesentium veritatis recusandae quibusdam!</p>
        </DialogContent>
      </Dialog>
    </>
  );
}


