import { SupabaseClient } from "@supabase/supabase-js";
import {
  asignBadge,
  upOrAddReputationPoints,
} from "@/app/api/helpers/badgesAchievements";
import payloadNotification from "@/content/notitications/notications-entity.json";
import { createNotification } from "@/lib/notifications";

type AchievementData = {
  user_id: string;
  achievement_id: string;
  created_at?: string;
  id?: string;
}[];

export async function createQuestion(
  title: string,
  content: string,
  tags: string[] = [],
  supabaseClient: SupabaseClient
) {
  const { data: sessionData } = await supabaseClient.auth.getUser();
  const user_id = sessionData?.user?.id;

  if (!user_id) {
    throw new Error("Usuario no autenticado");
  }

  const slug = title.toLocaleLowerCase().replaceAll(" ", "-").trim();
  const { data, error } = await supabaseClient
    .from("questions")
    .insert([
      {
        user_id: user_id,
        title,
        slug: slug,
        content,
        status: "pending",
      },
    ])
    .select("id");

  if (error) {
    throw new Error(`Error al guardar en Supabase: ${error.message}`);
  }

  // // inserta tags en la tabla de relacion entre questions y tags
  await insertTags(data, tags, supabaseClient);

  // validar insignia de pregunta del usuario
  const datainsignia = await asignBadgeQuestion(user_id, supabaseClient);

  // Asignar puntos de reputación al usuario
  await upOrAddReputationPoints(user_id, 5, supabaseClient);

  return {
    success: true,
    data,
    datainsignia,
  };
}

type QuestionData = {
  id: string;
}[];

async function insertTags(
  data: QuestionData,
  tags: string[],
  supabaseClient: SupabaseClient
) {
  if (data && tags.length > 0) {
    const tagInserts = tags.map((tag: string) => ({
      question_id: data[0]?.id,
      tag_id: tag,
    }));

    const { error: tagError } = await supabaseClient
      .from("question_tags")
      .insert(tagInserts);

    if (tagError) {
      console.log("ERROR:", tagError);
      throw new Error(`Error al insertar tags: ${tagError.message}`);
    }
  }
}
/**
 *
 * Asigna una insignia al usuario si cumple con los criterios
 * @param user_id - ID del usuario al que se le asignará la insignia
 * @param supabaseClient - Cliente de Supabase
 * @returns Promise que resuelve a los datos de la insignia o null si no se asignó
 */
async function asignBadgeQuestion(
  user_id: string,
  supabaseClient: SupabaseClient
) {
  const { count } = await supabaseClient
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user_id);

  const datainsignia: AchievementData | null = null;

  switch (count) {
    case 1:
      await questionAchievements(
        user_id,
        supabaseClient,
        "primera pregunta",
      );
      break;
    case 10:
      await questionAchievements(
        user_id,
        supabaseClient,
        "mente curiosa",
      );
      break;
  }
  return datainsignia;
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
  const { data: full_name } = await supabase
    .from("users")
    .select("full_name")
    .eq("id", user_id);

  const notificationPayload = {
    user_id: user_id,
    actor_id: user_id,
    type: payloadNotification[5].type,
    entity_type: payloadNotification[5].entity_type,
    content: `🎉 Felicitaciones ${full_name}. \n 
      ${message}
      `,
    url: `/profile?id=${user_id}`,
    read: false,
  };

  await createNotification(notificationPayload);
}

/**
 * Asigna una insignia al usuario si cumple con los criterios
 * @param user_id - ID del usuario al que se le asignará la insignia
 */

// logros relacionados a preguntas
async function questionAchievements(
  user_id: string,
  supabaseClient: SupabaseClient,
  achievementName: string, 
) {
  const {
    error,
    errorCode,
    errorMessage,
    data: insigniasData,
  } = await asignBadge(
    user_id,
    supabaseClient,
    achievementName.replaceAll(" ", "_")
  );

  const message = `Acabas de recibir la insigania de ${achievementName}, de parte de tudami te queremos enviar un caluroso saludo por tu compromiso y aportes a la comunidad. \n Para ver tu nueva insignia. puede visitar tu perfil haciendo clic sobre este mensaje.`;

  await notications(user_id, supabaseClient, message);

  if (error && errorCode !== "23505") {
    console.error("Error otorgando insignia:", errorMessage);
    throw errorMessage;
  } else if (!error) {
    return insigniasData;
  }
}
