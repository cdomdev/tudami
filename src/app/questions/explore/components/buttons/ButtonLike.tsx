"use client";

import { supabase } from "@/utils/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { toggleLike, checkIfLiked } from "../../lib/likeQuestions";
import { useSession } from "@/context/context.sesion";
import { createNotification } from "@/lib/notifications";
import nPayload from "@/content/notitications/notications-entity.json";
import { useLikeEvents } from "@/context/like-events.context";

export function ButtonLike({ question_id }: { question_id: number }) {
  const { user } = useSession();
  const { emitLikeEvent } = useLikeEvents();
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

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

    const actionToEmit = hasLiked ? "remove" : "add";
    emitLikeEvent(question_id, actionToEmit);
    setHasLiked(!hasLiked);

    const { liked, error } = await toggleLike(question_id, user.id);

    if (error) {
      setHasLiked(hasLiked);
      emitLikeEvent(question_id, hasLiked ? "add" : "remove");
      return;
    }

    if (liked !== !hasLiked) {
      setHasLiked(liked);
      emitLikeEvent(question_id, liked ? "add" : "remove");
    }

    if (liked) {
      const { data: questionData } = await supabase
        .from("questions")
        .select("user_id")
        .eq("id", question_id)
        .single();

      const questionOwnerId = questionData?.user_id;

      if (questionOwnerId && questionOwnerId !== user.id) {
        const notificationPayload = {
          user_id: questionOwnerId,
          actor_id: user.id,
          type: nPayload[0].type,
          entity_id: question_id.toString(),
          entity_type: nPayload[0].entity_type,
          content: `${user.full_name || "A alguien"} le gusto tu publicacion`,
          url: `/explore-questions/questions?query=redirect&redirect_id_question=${question_id}&aprovel=${user.approval_token}`,
          read: false,
        };

        const res = await createNotification(notificationPayload);

        if (!res) {
          console.error("Error creando notificación");
        }
      }
    }
  };

  return (
    <>
      <Button
        disabled={loading}
        variant={"ghost"}
        onClick={handleLike}
        className={`transition-colors duration-200 cursor-pointer  p-1 ${
          hasLiked
            ? "bg-transparent text-blue-600 hover:text-blue-600 dark:hover:bg-transparent dark:bg-transparent "
            : "text-black dark:text-white hover:bg-gray-200 dark:hover:text-blue-600"
        }`}
      >
        <ThumbsUp
          className={`w-5 h-5 ${
            hasLiked ? "fill-blue-600 hover:text-white" : "fill-none"
          }`}
        />
        <span className="sr-only">{hasLiked ? "Quitar like" : "Dar like"}</span>
      </Button>
    </>
  );
}
