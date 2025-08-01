import { supabase } from "@/utils/supabase/supabaseClient";

export async function toggleLike(questionId: number, user_id: string) {
  const { data: existingLike } = await supabase
    .from("question_likes")
    .select("id")
    .eq("question_id", questionId)
    .eq("user_id", user_id)
    .maybeSingle();
  if (existingLike) {
    const { error: deleteError } = await supabase
      .from("question_likes")
      .delete()
      .eq("question_id", questionId)
      .eq("user_id", user_id);
    return { liked: false, error: deleteError };
  } else {
    const { error: insertError } = await supabase
      .from("question_likes")
      .insert({
        question_id: questionId,
        user_id,
      });
    return { liked: true, error: insertError };
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
