"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { toggleLike, checkIfLiked } from "../lib/likeQuestions";
import { useSession } from "@/context/context.sesion";
import { ToggleComment } from "./ToggleComment";

export function ToggleLike({
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

    const { count } = await supabase
      .from("question_likes")
      .select("*", { count: "exact", head: true })
      .eq("question_id", question_id);

    onLikeChange?.(count ?? 0);
  };

  const styleLiked = hasLiked
    ? "text-white hover:text-white bg-blue-700 hover:bg-blue-800"
    : "text-gray-700 hover:text-gray-800 hover:bg-gray-200";

  return (
    <>
      <Button
        onClick={handleLike}
        disabled={loading}
        variant="ghost"
        size="sm"
        className={`flex items-center gap-1 duration-200 cursor-pointer ${styleLiked}`}
      >
        <ThumbsUp className={hasLiked ? "text-white" : "text-gray-500"} />
        {hasLiked ? "Te gusta" : "Me gusta"}
      </Button>

      <ToggleComment question_id={question_id}  />
    </>
  );
}
