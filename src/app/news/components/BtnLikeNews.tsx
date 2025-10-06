"use client";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "@/context/context.sesion";
import { chekLike, getLikes } from "../lib/new";

export function BtnLikeNews({ new_id }: { new_id: number }) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const { user } = useSession();

  const userId = user?.id;
  async function handleLike() {
    await getLikes(new_id).then(({ count }) => setCount(count || 0));
    setCount(count || 0);
    setHasLiked(true);
  }

  useEffect(() => {
    chekLike(new_id, userId).then((liked) => {
      setHasLiked(liked);
      setLoading(false);
    });
  }, [chekLike, new_id, userId]);

  return (
    <div className="flex items-center gap-1">
      <Button
        disabled={loading}
        variant="ghost"
        onClick={handleLike}
        className={`transition-colors duration-200 hover:bg-transparent dark:bg-transparent cursor-pointer px-1 ${
          hasLiked
            ? " text-blue-600 hover:text-blue-600  "
            : "text-black dark:text-white  dark:hover:text-blue-600 "
        }`}
      >
        <ThumbsUp
          className={`w-5 h-5 ${
            hasLiked ? "fill-blue-600 hover:text-white  " : "fill-none "
          }`}
        />
        <span className="sr-only">{hasLiked ? "Quitar like" : "Dar like"}</span>
      </Button>
      <span className="text-sm text-gray-300">{count}</span>
    </div>
  );
}
