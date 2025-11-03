import { SupabaseClient } from "@supabase/supabase-js";
import {asignBadge, upOrAddReputationPoints} from '@/app/api/helpers/badgesAchievements'

type AchievementData = {
  user_id: string;
  achievement_id: string;
  created_at?: string;
  id?: string;
}[];

type CreateQuestionResult = {
  success: boolean;
  data?: QuestionData;
  datainsignia?: AchievementData | null;
  error?: string;
};

export async function createQuestion(
  title: string,
  content: string,
  tags: string[] = [],
  supabaseClient: SupabaseClient
): Promise<CreateQuestionResult> {
  const { data: sessionData } = await supabaseClient.auth.getUser();
  const userId = sessionData?.user?.id;

  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  const slug = title.toLocaleLowerCase().replaceAll(" ", "-").trim();
  const { data, error } = await supabaseClient
    .from("questions")
    .insert([
      {
        user_id: userId,
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
  const datainsignia = await asignBadgeQuestion(userId, supabaseClient);

  // Asignar puntos de reputación al usuario
  await upOrAddReputationPoints(userId, 5 , supabaseClient);

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
 * @param userId - ID del usuario al que se le asignará la insignia
 * @param supabaseClient - Cliente de Supabase
 * @returns Promise que resuelve a los datos de la insignia o null si no se asignó
 */
async function asignBadgeQuestion(
  userId: string,
  supabaseClient: SupabaseClient
): Promise<AchievementData | null> {
  const { count } = await supabaseClient
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  let datainsignia: AchievementData | null = null;

  if (count === 1) {
    
    const {error, errorCode, errorMessage,  data: insigniasData} =  await asignBadge(userId, supabaseClient, "primera_pregunta") 
  
      if (error && errorCode !== "23505") {
      console.error("Error otorgando insignia:", errorMessage);
      throw errorMessage
    } else if (!error) {
      if (insigniasData) {
        datainsignia = insigniasData as unknown as AchievementData;
      }
    }
  }
  return datainsignia;
}


