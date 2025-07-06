"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/context.sesion";
import { supabase } from "@/lib/supabase";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";


export function ButtonComment({ question_id }: { question_id: number }) {
  const { user } = useSession();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user || !content.trim()) return
    setLoading(true);


    const { error } = await supabase.from("question_comments").insert({
      text: content.trim(),
      question_id,
      user_id: user.id,
    });

    if (!error) {
      setContent("");
      setOpen(false);
    }

    toast.success("Comentario enviado");

    setLoading(false);
  };


  return (
    <div className="relative inline-block w-full  ">
      <Button
        variant="ghost"
        onClick={() => setOpen(!open)}
        size={"sm"}
        className="text-sm text-primary hover:bg-transparent flex items-center gap-1 cursor-pointer "
      >
        <MessageCircle className="size-4" />
        Comentar
      </Button>

      {open && (
        <div className="-translate-x-22 w-xs md:min-w-3xl bg-card  mt-5 ">
          <Textarea
            placeholder="Escribe tu comentario..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full resize-none focus:outline-none ring-0 focus:ring-0 dark:focus:ring-0 dark:focus:underline-none "
          />
          <div className="flex gap-2 justify-end mt-2">
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
            className="cursor-pointer"
              size="sm"
              onClick={handleSubmit}
              disabled={loading || !content.trim()}
            >
              {loading ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
