"use client";
import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "@/context/context.sesion";
import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "sonner";

export function BtnLikeNews({ new_id }: { new_id: number }) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const { user } = useSession();

  async function handleLike() {
    const { error, data, count } = await supabase
      .from("news_likes")
      .insert({
        new_id: new_id,
        user_id: user?.id,
      })
      .select();
    if (error) toast.error(error.message);
    console.log({data, count})
  }

  useEffect(() =>{
    chekLike().then(liked => {
        setHasLiked(liked)
        setLoading(false);
    })
  }, [])

  async function chekLike() {
    const {  data } = await supabase
      .from("news_likes")
      .select("*")
      .eq("new_id", new_id)
      .eq("user_id", user?.id).maybeSingle()
    return !!data
  }

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
      <span className="sr-only">
        {hasLiked ? "Quitar like" : "Dar like"}
      </span>
    </Button>
      <span className="text-sm text-gray-300">{count}</span>
    </div>
  );
}
