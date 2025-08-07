import { supabase } from "@/utils/supabase/supabaseClient";

export async function toggleLike(questionId: number, user_id: string) {
  try {
    const urlRequest = `/api/explore-questions/emit-like?question_id=${questionId}&user_id=${user_id}`;
    const res = await fetch(urlRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to toggle like", { cause: res.status });
    }
    const data = await res.json();
    return { liked: data.liked, error: null };
  } catch (error) {
    console.error("Error al emitir like:", error);
    return { liked: false, error };
  }
}

export const checkIfLiked = async (questionId: number, user_id: string) => {
  const { data: existingLike } = await supabase
    .from("question_likes")
    .select("id")
    .eq("question_id", questionId)
    .eq("user_id", user_id)
    .maybeSingle();

  return !!existingLike;
};
