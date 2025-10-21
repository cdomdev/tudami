"use client";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "@/context/context.sesion";
import {
  checkLikeResponse,
  emitLikeResponse,
  removeLikeResponse,
  getLikesCountResponse,
} from "../../lib/likes";
import { supabase } from "@/utils/supabase/supabaseClient";

export function BtnLikeResponse({
  response_id,
  // question_id,
}: {
  response_id: number;
  // question_id: number;
}) {
  const [count, setCount] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useSession();
  const userId = user?.id;

  const updateCount = useCallback(async () => {
    const newCount = await getLikesCountResponse(response_id);
    setCount(newCount);
  }, [response_id]);

  // Realtime
  useEffect(() => {
    async function initialize() {
      setLoading(true);

      const totalCount = await getLikesCountResponse(response_id);
      setCount(totalCount);

      if (userId) {
        const liked = await checkLikeResponse(response_id, userId);
        setHasLiked(liked);
      }

      setLoading(false);
    }

    initialize();

    const insertChannel = supabase
      .channel(`question_response_likes_insert_${response_id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "questions_response_likes",
          filter: `response_id=eq.${response_id}`,
        },
        async (payload) => {
          await updateCount();
          if (userId && payload.new?.user_id === userId) {
            setHasLiked(true);
          }
        }
      )
      .subscribe();

    const deleteChannel = supabase
      .channel(`question_response_likes_delete_${response_id}`)
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "questions_response_likes",
          filter: `response_id=eq.${response_id}`,
        },
        async (payload) => {
          await updateCount();
          if (userId && payload.old?.user_id === userId) {
            setHasLiked(false);
          }
        }
      )
      .subscribe();

    // Cleanup
    return () => {
      supabase.removeChannel(insertChannel);
      supabase.removeChannel(deleteChannel);
    };
  }, [response_id, userId, updateCount]);

  const handleLike = useCallback(async () => {
    if (!userId || isProcessing) return;

    setIsProcessing(true);

    try {
      const result = hasLiked
        ? await removeLikeResponse(response_id, userId)
        : await emitLikeResponse(
            response_id,
            userId,
            
          );

      if (result.success) {
        await updateCount();
        setHasLiked(!hasLiked);
      }
    } catch (error) {
      console.error("Error en handleLike:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [userId, isProcessing, hasLiked, response_id, updateCount]);

  const isDisabled = loading || isProcessing || !userId;

  return (
    <div className="flex items-center gap-1">
      <Button
        disabled={isDisabled}
        variant="ghost"
        onClick={handleLike}
        aria-label={hasLiked ? "Quitar like" : "Dar like"}
        className={`transition-colors duration-200 hover:bg-none dark:hover:bg-none hover:bg-transparent dark:hover:bg-transparent cursor-pointer px-1 ${
          hasLiked
            ? "text-blue-600 hover:text-blue-600"
            : "text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-600"
        }`}
      >
        <ThumbsUp
          className={`w-5 h-5 transition-all ${
            hasLiked ? "fill-blue-600" : "fill-none"
          }`}
        />
        <span className="sr-only">{hasLiked ? "Quitar like" : "Dar like"}</span>
      </Button>
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {loading ? "..." : count}
      </span>
    </div>
  );
}
