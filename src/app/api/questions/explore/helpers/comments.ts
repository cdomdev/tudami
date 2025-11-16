import { SupabaseClient } from "@supabase/supabase-js";
import {
  asignBadge,
  upOrAddReputationPoints,
} from "@/app/api/helpers/badgesAchievements";
import { createNotification } from "@/lib/notifications";
import payloadNotification from "@/content/notitications/notications-entity.json";

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

  await addBadge(user.id, supabase);

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

async function notificacion(
  user_id: string,
  supabase: SupabaseClient,
  msg: string
) {
  const { data: datatUser } = await supabase
    .from("users")
    .select("full_name")
    .eq("id", user_id)
    .single();

  const full_name = datatUser?.full_name;

  const notificationPayload = {
    user_id: user_id,
    actor_id: user_id,
    type: payloadNotification[4].type,
    entity_type: payloadNotification[4].entity_type,
    content: `🎉 Felicitaciones ${full_name}. \n 
    ${msg}
    `,
    url: `/profile?id=${user_id}`,
    read: false,
  };

  await createNotification(notificationPayload);
}

async function addBadge(user_id: string, supabase: SupabaseClient) {
  const { data: badgeData } = await supabase
    .from("user_achievements")
    .select("*")
    .eq("achievement_id", "colaborador_frecuente")
    .eq("user_id", user_id);

  if (!badgeData || badgeData.length === 0) {
    const { count } = await supabase
      .from("question_comments")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user_id);

    switch (count) {
      case 20:
        await commentsAchievements(user_id, supabase, "colaborador frecuente");
        break;
      case 100:
        await commentsAchievements(user_id, supabase, "colaborador estrella");
        break;
    }
  }

  // up reputation
  await upOrAddReputationPoints(user_id, 5, supabase);
}

async function commentsAchievements(
  user_id: string,
  supabase: SupabaseClient,
  achievementName: string
) {
  const { error } = await asignBadge(
    user_id,
    supabase,
    achievementName.replaceAll(" ", "_")
  );

  if (error) {
    throw new Error(
      `Error en el proceso de asignar insignia ${achievementName}`,
      {
        cause: error,
      }
    );
  }

  const msg = `Acabas de recibir a insigania de ${achievementName}, de parte de tudami te queremos enviar un caluroso saludo por tu compromiso y aportes a la comunidad. \n

  Para ver tu nueva insignia. puede visitar tu perfil haciendo clic sobre este mensaje.`;

  await notificacion(user_id, supabase, msg);
}
