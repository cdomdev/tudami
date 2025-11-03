import { SupabaseClient } from "@supabase/supabase-js";
import { asignBadge, upOrAddReputationPoints } from "@/app/api/helpers/badgesAchievements";

export async function createComment({
  content,
  question_id,
  user,
  supabase,
}: {
  content: string;
  question_id: number;
  user: { id: string };
  supabase: SupabaseClient;
}) {

  const { data: commentData, error } = await supabase
    .from("question_comments")
    .insert({
      text: content.trim(),
      question_id,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating comment:", error.code);
    return error.code;
  }
  
  /**
   * obtener autor de la pregunta para emitir la notificacion */

  const questionData = await getQuestionOwnerId(question_id, supabase);

  /**
   * Obtener la cantidad de comentarios
   */

  const count = await getCountComments(question_id, supabase);

  await addBadge(user.id, supabase)

  return { commentData, questionData, count };
}


async function getCountComments(question_id: number, supabase: SupabaseClient) {
  const { count, error } = await supabase
    .from("question_comments")
    .select("*", { count: "exact", head: true })
    .eq("question_id", question_id);

  if (error) {
    console.error("Error fetching comment count:", error);
    return 0;
  }

  return count;
}

async function getQuestionOwnerId(
  question_id: number,
  supabase: SupabaseClient
) {
  const { data: questionData, error } = await supabase
    .from("questions")
    .select("user_id")
    .eq("id", question_id)
    .single();

  if (error) {
    console.error("Error fetching question owner:", error);
    return null;
  }

  return questionData;
}


async function addBadge(user_id: string, supabase: SupabaseClient) {

    const {data: badgeData, error} = await supabase.from("user_achievements").select("*").eq("achievement_id", "colaborador_frecuente").eq("user_id", user_id)

    console.log(badgeData, error)

    if(badgeData) return 

    const {count} = await supabase.from("question_comments").select("*", { count: "exact", head: true }).eq("user_id", user_id)
    
    console.log("count", count)

    if (count && count  > 2) {
        const {error, errorCode, errorMessage,  data: insigniasData} =  await asignBadge(user_id, supabase, "colaborador_frecuente") 
          console.log({error, errorCode, errorMessage,  data: insigniasData})
          if(error) throw error     
    }

    // up reputation
    await upOrAddReputationPoints(user_id, 5, supabase)

}


