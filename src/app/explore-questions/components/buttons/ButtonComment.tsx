"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/context.sesion";
import { supabase } from "@/utils/supabase/supabaseClient";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

export function ButtonComment({
  question_id,
  onCommentChange,
}: {
  question_id: number;
  onCommentChange?: (count: number) => void;
}) {
  const { user } = useSession();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user || !content.trim()) return;
    setLoading(true);

    const { data: commentData, error } = await supabase
      .from("question_comments")
      .insert({
        text: content.trim(),
        question_id,
        user_id: user.id,
      })
      .select()
      .single();

    /**
     * obtener autor de la pregunta para emitir la notificacion */

    const { data: questionData } = await supabase
      .from("questions")
      .select("user_id")
      .eq("id", question_id)
      .single();

    const questionOwnerId = questionData?.user_id;

    // 3. Si el autor no es el mismo usuario, crear notificación
    if (questionOwnerId && questionOwnerId !== user.id) {
      const notificationPayload = {
        user_id: questionOwnerId,
        actor_id: user.id,
        type: "comment_received",
        entity_id: commentData.id,
        entity_type: "question_comment",
        content: `${user.full_name || "Alguien"} comentó en tu pregunta.`,
        url: `/explore-questions/questions?query=my`,
        read: false,
      };

      const { error: notificationError } = await supabase
        .from("notifications")
        .insert([notificationPayload]);

      if (notificationError) {
        console.error("Error creando notificación:", notificationError);
      }
    }

    if (!error) {
      setContent("");
      setOpen(false);
    }

    // validar cantidad de comnetarios para emitir el evento

    const { count } = await supabase
      .from("question_comments")
      .select("*", { count: "exact", head: true })
      .eq("question_id", question_id);

    onCommentChange?.(count ?? 0);
    toast.success("Comentario enviado");

    setLoading(false);
  };

  return (
    <div className="w-full">
      <Button
        variant="ghost"
        onClick={() => setOpen(!open)}
        size="sm"
        className="text-sm text-primary hover:bg-transparent flex items-center gap-1 cursor-pointer"
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
            className="w-full resize-none rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 transition"
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
              {loading ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
