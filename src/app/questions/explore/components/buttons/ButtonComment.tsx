"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/context.sesion";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { createComment } from "../../lib/comment";
import { noficationsFromComments } from "../../lib/emitNotifications";
import { Spinner } from "@/components";

export function ButtonComment({ question_id }: { question_id: number }) {
  const { user } = useSession();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;
    setLoading(true);

    try {
      const data = await createComment(content, question_id, user.id);
      const { questionData, error } = data;
      const questionOwnerId = questionData?.user_id;

      await noficationsFromComments(
        question_id,
        questionOwnerId,
        user.id,
        user.full_name
      );

      if (!error || !data) {
        setContent("");
        setOpen(false);
        setLoading(false);
      }

      toast.success("Comentario enviado");

      setLoading(false);
    } catch (error) {
      console.error("Error creating comment:", error);
      setLoading(false);
      toast.error(
        "Error: Algo salio mal al comentar la pregunta, por favor intentalo mas tarde o intenta validar tu sesion"
      );
    }
  };

  const textLoading = loading ? "Enviando" : "Enviar";

  return (
    <div className="w-full overflow-y-hidden">
      <Button
        variant="ghost"
        onClick={() => setOpen(!open)}
        size="default"
        className="text-sm  hover:bg-none dark:bg-none hover:bg-transparent dark:hover:bg-transparent  flex items-center gap-1 cursor-pointer"
      >
        <MessageCircle className="size-4" />
        Comentar
      </Button>

      {open && (
        <div className="mt-4 w-full">
          <Textarea
            placeholder="Escribe tu comentario..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full resize-none rounded-md  bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-0 dark:right-0 transition text-xs md:text-sm lg:text-sm"
          />
          <div className="flex gap-2 justify-end mt-3">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer"
              onClick={() => {
                setContent("");
                setOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              className="cursor-pointer"
              onClick={handleSubmit}
              disabled={loading || !content.trim()}
            >
              {loading && <Spinner />} {textLoading}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
