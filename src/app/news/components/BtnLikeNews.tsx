"use client";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "@/context/context.sesion";
import { checkLike, emitLike, removeLike, getLikesCount } from "../lib/new";
import { supabase } from "@/utils/supabase/supabaseClient";

export function BtnLikeNews({ new_id }: { new_id: number }) {
  const [count, setCount] = useState<number | null>(0);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useSession();
  const userId = user?.id;

  const updateCount = useCallback(async () => {
    const newCount = await getLikesCount(new_id);
    setCount(newCount);
  }, [new_id]);

  // Realtime
  useEffect(() => {
    async function initialize() {
      setLoading(true);

      const totalCount = await getLikesCount(new_id);
      setCount(totalCount);

      if (userId) {
        const liked = await checkLike(new_id, userId);
        setHasLiked(liked);
      }

      setLoading(false);
    }

    initialize();

    const insertChannel = supabase
      .channel(`news_likes_insert_${new_id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "news_likes",
          filter: `new_id=eq.${new_id}`,
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
      .channel(`news_likes_delete_${new_id}`)
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "news_likes",
          filter: `new_id=eq.${new_id}`,
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
  }, [new_id, userId, updateCount]);

  const handleLike = useCallback(async () => {
    if (!userId || isProcessing) return;

    setIsProcessing(true);

    try {
      const result = hasLiked
        ? await removeLike(new_id, userId)
        : await emitLike(new_id, userId);

      if (result.success) {
        await updateCount();
        setHasLiked(!hasLiked);
      }
    } catch (error) {
      console.error("Error en handleLike:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [userId, isProcessing, hasLiked, new_id, updateCount]);

  const isDisabled = loading || isProcessing || !userId;

  return (
    <div className="flex items-center gap-1">
      <Button
        disabled={isDisabled}
        variant="ghost"
        onClick={handleLike}
        aria-label={hasLiked ? "Quitar like" : "Dar like"}
        className={`transition-colors duration-200 hover:bg-transparent dark:bg-transparent cursor-pointer px-1 ${
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
