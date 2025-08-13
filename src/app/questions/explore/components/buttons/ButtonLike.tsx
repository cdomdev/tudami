"use client";

import { supabase } from "@/utils/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { toggleLike, checkIfLiked } from "../../lib/likeQuestions";
import { useSession } from "@/context/context.sesion";
import { createNotification } from "@/lib/notifications";
import nPayload from "@/content/notitications/notications-entity.json";
import { useLikeEventsStore, useLikeEvent } from "@/context/likeEventsContext";

export function ButtonLike({ question_id }: { question_id: number }) {
  const { user } = useSession();
  const emitLikeEvent = useLikeEventsStore((s) => s.emitLikeEvent);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Inicial: comprobar si el usuario ya dio like
  useEffect(() => {
    if (!user) return;
    checkIfLiked(question_id, user.id).then((liked) => {
      setHasLiked(liked);
      setLoading(false);
    });
  }, [user, question_id]);

  // 🔹 Escuchar eventos de like desde cualquier parte o pestaña
  useLikeEvent((event) => {
    if (event.question_id === question_id && user) {
      // Solo actualizamos si no es el mismo usuario que lo disparó (opcional)
      if (event.timestamp !== undefined) {
        setHasLiked(event.action === "add");
      }
    }
  });

  async function handleLike() {
    if (!user) return;

    // Emitimos evento optimista
    const actionToEmit = hasLiked ? "remove" : "add";
    emitLikeEvent(question_id, actionToEmit);
    setHasLiked(!hasLiked);

    // Persistimos en la base de datos
    const { liked, error } = await toggleLike(question_id, user.id);

    if (error) {
      // Revertimos si hubo error
      setHasLiked(hasLiked);
      emitLikeEvent(question_id, hasLiked ? "add" : "remove");
      return;
    }

    // Ajuste si el backend devuelve un estado distinto al esperado
    if (liked !== !hasLiked) {
      setHasLiked(liked);
      emitLikeEvent(question_id, liked ? "add" : "remove");
    }

    // Crear notificación si corresponde
    if (liked) {
      const { data: questionData } = await supabase
        .from("questions")
        .select("user_id")
        .eq("id", question_id)
        .single();

      const questionOwnerId = questionData?.user_id;

      if (questionOwnerId && questionOwnerId !== user.id) {
        await createNotification({
          user_id: questionOwnerId,
          actor_id: user.id,
          type: nPayload[0].type,
          entity_id: question_id.toString(),
          entity_type: nPayload[0].entity_type,
          content: `${user.full_name || "A alguien"} le gustó tu publicación`,
          url: `/explore-questions/questions?query=redirect&redirect_id_question=${question_id}&aprovel=${user.approval_token}`,
          read: false,
        });
      }
    }
  }

  return (
    <Button
      disabled={loading}
      variant="ghost"
      onClick={handleLike}
      className={`transition-colors duration-200 p-1 ${
        hasLiked
          ? "bg-transparent text-blue-600 hover:text-blue-600 dark:hover:bg-transparent"
          : "text-black dark:text-white hover:bg-gray-200 dark:hover:text-blue-600"
      }`}
    >
      <ThumbsUp
        className={`w-5 h-5 ${
          hasLiked ? "fill-blue-600 hover:text-white" : "fill-none"
        }`}
      />
      <span className="sr-only">
        {hasLiked ? "Quitar like" : "Dar like"}
      </span>
    </Button>
  );
}
