"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { toggleLike, checkIfLiked } from "../../lib/likeQuestions";
import { useSession } from "@/context/context.sesion";
import {emitLike} from "../../lib/likes"
import { useLikeEventsStore, useLikeEvent } from "@/context/likeEventsContext";

export function ButtonLike({ question_id }: { question_id: number }) {
  const { user } = useSession();
  const emitLikeEvent = useLikeEventsStore((s) => s.emitLikeEvent);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    checkIfLiked(question_id, user.id).then((liked) => {
      setHasLiked(liked);
      setLoading(false);
    });
  }, [user, question_id]);

  useLikeEvent((event) => {
    if (event.question_id === question_id && user) {
      if (event.timestamp !== undefined) {
        setHasLiked(event.action === "add");
      }
    }
  });

  async function handleLike() {
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
      await emitLike({
        question_id,
        user_id: user.id,
        full_name: user.full_name || "Alguien",
      });
    }
  }

  return (
    <Button
      disabled={loading}
      variant="ghost"
      onClick={handleLike}
      className={`transition-colors duration-200 hover:bg-transparent cursor-pointer px-1 ${
        hasLiked
          ? "bg-transparent text-blue-600 hover:text-blue-600 "
          : "text-black dark:text-white  dark:hover:text-blue-600 "
      }`}
    >
      <ThumbsUp
        className={`w-5 h-5 ${
          hasLiked ? "fill-blue-600 hover:text-white " : "fill-none "
        }`}
      />
      <span className="sr-only">
        {hasLiked ? "Quitar like" : "Dar like"}
      </span>
    </Button>
  );
}
