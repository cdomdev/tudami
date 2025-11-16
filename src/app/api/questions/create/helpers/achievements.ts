import { SupabaseClient } from "@supabase/supabase-js";
import { asignBadge } from "../../../helpers/badgesAchievements";
import payloadNotification from "@/content/notitications/notications-entity.json";
import { createNotification } from "@/app/api/notifications/helpers/notifications";

type AchievementData = {
  user_id: string;
  achievement_id: string;
  created_at?: string;
  id?: string;
}[];
/**
 *
 * Asigna una insignia al usuario si cumple con los criterios
 * @param user_id - ID del usuario al que se le asignará la insignia
 * @param supabaseClient - Cliente de Supabase
 * @returns Promise que resuelve a los datos de la insignia o null si no se asignó
 */
export async function asignBadgeQuestion(
  user_id: string,
  supabaseClient: SupabaseClient
) {
  const { count, error } = await supabaseClient
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user_id);

  if (error) {
    console.error("Error obteniendo el conteo de preguntas:", error.message);
    throw new Error(
      `Error obteniendo el conteo de preguntas: ${error.message}`
    );
  }

  const datainsignia: AchievementData | null = null;

  switch (count) {
    case 1:
      await questionAchievements(user_id, supabaseClient, "primera pregunta");
      break;
    case 10:
      await questionAchievements(user_id, supabaseClient, "mente curiosa");
      break;
  }
  return datainsignia;
}

/**
 * Asigna una insignia al usuario si cumple con los criterios
 * @param user_id - ID del usuario al que se le asignará la insignia
 */

// logros relacionados a preguntas
async function questionAchievements(
  user_id: string,
  supabaseClient: SupabaseClient,
  achievementName: string
) {
  const {
    error,
    errorCode,
    errorMessage,
    data: insigniasData,
  } = await asignBadge(user_id, supabaseClient, achievementName);

  const message = `Acabas de recibir la insigania de ${achievementName}, de parte de tudami te queremos enviar un caluroso saludo por tu compromiso y aportes a la comunidad. \n Para ver tu nueva insignia. puede visitar tu perfil haciendo clic sobre este mensaje.`;

  await notications(user_id, supabaseClient, message);

  if (error && errorCode !== "23505") {
    console.error("Error otorgando insignia:", errorMessage);
    throw errorMessage;
  } else if (!error) {
    return insigniasData;
  }
}

/**
 * Notificacion para casos de asignacion de insignias
 * @param user_id
 * @param supabase
 * @param message
 */

async function notications(
  user_id: string,
  supabase: SupabaseClient,
  message: string
) {
  const { data } = await supabase
    .from("users")
    .select("full_name")
    .eq("id", user_id);

  const notificationPayload = {
    user_id: user_id,
    actor_id: user_id,
    type: payloadNotification[5].type,
    entity_type: payloadNotification[5].entity_type,
    content: `🎉 Felicitaciones ${data?.[0]?.full_name}. \n 
      ${message}
      `,
    url: `/profile?id=${user_id}`,
    read: false,
  };

  await createNotification(notificationPayload);
}
