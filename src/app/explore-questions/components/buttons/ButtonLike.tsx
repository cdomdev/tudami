"use client";

import { supabase } from "@/utils/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { toggleLike, checkIfLiked } from "../../lib/likeQuestions";
import { useSession } from "@/context/context.sesion";
import { createNotification } from "@/lib/notifications"
import nPayload from "@/content/notitications/notications-entity.json"

export function ButtonLike({
  question_id,
  onLikeChange,
}: {
  question_id: number;
  onLikeChange?: (count: number) => void;
}) {
  const { user } = useSession();
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar si ya dio like
  useEffect(() => {
    const checkLike = async () => {
      if (!user) return;
      const liked = await checkIfLiked(question_id, user.id);
      setHasLiked(liked);
      setLoading(false);
    };

    checkLike();
  }, [user, question_id]);

  const handleLike = async () => {
    if (!user) return;

    const { liked } = await toggleLike(question_id, user.id);
    setHasLiked(liked);

    // validar cantidad de likes
    const { data, count } = await supabase
      .from("question_likes")
      .select("*", { count: "exact", head: true })
      .eq("question_id", question_id).select().single();


    // emitir notiticaion 

    const questionOwnerId = user.id;

    if (questionOwnerId && questionOwnerId !== user.id) {
      const notificationPayload = {
        user_id: questionOwnerId,
        actor_id: user.id,
        type: nPayload[0].type,
        entity_id: data.id,
        entity_type: nPayload[0].entity_type,
        content: `${user.full_name || "A alguien"} le gusto tu publicacion`,
        url: `/explore-questions/questions?query=redirect&redirect_id_question=${question_id}&aprovel=${user.approval_token}`,
        read: false,
      };

      const res = await createNotification(notificationPayload);

      console.log("datos de la respuesta de la notificacion --->", res);

      if (!res) {
        console.error("Error creando notificación");
      }
    }

    // emitir evento para el cambio del count
    onLikeChange?.(count ?? 0);
  };

  return (
    <>
      <Button
        disabled={loading}
        variant={"ghost"}
        onClick={handleLike}
        className={`transition-colors duration-200 cursor-pointer  p-1 ${hasLiked
          ? "bg-transparent text-blue-600 hover:text-blue-600 dark:hover:bg-transparent dark:bg-transparent "
          : "text-black dark:text-white hover:bg-gray-200 dark:hover:text-blue-600"
          }`}
      >
        <ThumbsUp
          className={`w-5 h-5 ${hasLiked ? "fill-blue-600 hover:text-white" : "fill-none"
            }`}
        />
        <span className="sr-only">{hasLiked ? "Quitar like" : "Dar like"}</span>
      </Button>
    </>
  );
}
