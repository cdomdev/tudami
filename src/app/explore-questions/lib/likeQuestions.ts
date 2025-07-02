import { supabase } from "@/lib/supabase";

export async function toggleLike(questionId: number, user_id: string) {

  console.log("Toggling like for questionId:", questionId, "and user_id:", user_id);


  
  const { data: existingLike } = await supabase
    .from("question_likes")
    .select("id")
    .eq("question_id", questionId)
    .eq("user_id", user_id)
    .single();

  if (existingLike) {
    // Quitar el like
    await supabase.from("question_likes").delete().eq("id", existingLike.id);
  } else {
    // Agregar el like
    await supabase.from("question_likes").insert({
      question_id: questionId,
      user_id: user_id,
    });
  }

  // Opcional: refrescar el conteo
}
