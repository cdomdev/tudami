"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/context.sesion";
import { supabase } from "@/lib/supabase";
import { MessageCircle } from "lucide-react";

export function ToggleComment({ question_id }: { question_id: number }) {
  const { user } = useSession();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;
    setLoading(true);

    const { error } = await supabase.from("question_comments").insert({
      question_id,
      user_id: user.id,
      content: content.trim(),
    });

    if (!error) {
      setContent("");
      setOpen(false);
    }

    setLoading(false);
  };

  return (
    <div className="relative inline-block w-full  ">
      <Button
        variant="ghost"
        onClick={() => setOpen(!open)}
        className="text-sm text-primary hover:bg-transparent flex items-center gap-1 cursor-pointer"
      >
        <MessageCircle className="size-4" />
        Comentar
      </Button>

      {open && (
        <div className="absolute z-20 lg:-translate-x-1/12 -translate-x-1/3 w-xs md:min-w-2xl bg-background border border-border rounded-md p-3 mt-2 shadow-md">
          <Textarea
            placeholder="Escribe tu comentario..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full resize-none"
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
