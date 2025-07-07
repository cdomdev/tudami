import { MessageCircle, X } from "lucide-react";
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
import { BodyListComment } from "../BodyListComment";
import { DialogClose } from "@radix-ui/react-dialog";


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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="hover:bg-none hover:bg-transparent cursor-pointer">
            <MessageCircle className="h-8 w-8 text-gray-500 dark:text-white" />{count}
            <span className="sr-only">open dialog</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-2xl lg:min-w-4xl overflow-y-auto max-h-1/3 [&>button:last-child]:hidden">
          <DialogHeader className="sticky top-0 z-10 p-2  border-b">
            <div className="flex items-center justify-between">
              <>
                <DialogTitle className="sr-only">Respuestas</DialogTitle>
                <DialogDescription>
                  Respuestas
                </DialogDescription>
              </>
              <>
                <DialogClose asChild >
                  <button
                    className="absolute right-4 top-0 rounded-md cursor-pointer p-2 text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-0 "
                    aria-label="Cerrar"
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">close dialog</span>
                  </button>
                </DialogClose>
              </>
            </div>

          </DialogHeader>
          <BodyListComment question_id={question_id} />
        </DialogContent>
      </Dialog>
    </>
  );
}


