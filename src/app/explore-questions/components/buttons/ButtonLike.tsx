"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { toggleLike, checkIfLiked } from "../../lib/likeQuestions";
import { useSession } from "@/context/context.sesion";

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
    const { count } = await supabase
      .from("question_likes")
      .select("*", { count: "exact", head: true })
      .eq("question_id", question_id);

    // emitir evento para el cambio del count
    onLikeChange?.(count ?? 0);
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
