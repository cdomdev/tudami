import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCommentsChannel } from "@/hooks/use-comments-channel";
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


export function BtnCounterComment({ question_id }: { question_id: number }) {
  const count = useCommentsChannel(question_id);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className="hover:bg-none hover:bg-transparent cursor-pointer">
            <MessageCircle className="h-8 w-8 text-gray-500 dark:text-white" />{count}
            <span className="sr-only">open dialog</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-2xl lg:min-w-4xl overflow-y-auto max-h-3/5 [&>button:last-child]:hidden dialog-content-scrollbar">
          <DialogHeader className="sticky top-0 z-10 p-2  border-b">
            <div className="flex items-center justify-between bg-white/50  dark:bg-gray-800 py-2">
              <>
                <DialogTitle className="sr-only">Respuestas</DialogTitle>
                <DialogDescription className="text-sm pl-2 font-semibold text-gray-900 dark:text-white">
                  Respuestas
                </DialogDescription>
              </>
              <>
                <DialogClose asChild >
                  <button
                    className="absolute right-4  rounded-md cursor-pointer p-2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-0 "
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


