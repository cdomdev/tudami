import { supabase } from "@/utils/supabase/supabaseClient";

export async function toggleLike(questionId: number, user_id: string) {
  try {
    const { data: existingLike, error: selectError } = await supabase
      .from("question_likes")
      .select("id")
      .eq("question_id", questionId)
      .eq("user_id", user_id)
      .maybeSingle();

    if (selectError) {
      return { liked: false, error: selectError };
    }

    if (existingLike) {
      const { error: deleteError } = await supabase
        .from("question_likes")
        .delete()
        .eq("question_id", questionId)
        .eq("user_id", user_id);

      if (deleteError) {
        console.error(`[toggleLike] Error eliminando like:`, deleteError);
      } else {
        console.log(`[toggleLike] Like eliminado exitosamente`);
      }

      return { liked: false, error: deleteError };
    } else {
      const { error: insertError } = await supabase
        .from("question_likes")
        .insert({
          question_id: questionId,
          user_id,
        });

      if (insertError) {
        console.error(`[toggleLike] Error agregando like:`, insertError);
      }

      return { liked: true, error: insertError };
    }
  } catch (error) {
    console.error(`[toggleLike] Error inesperado:`, error);
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
