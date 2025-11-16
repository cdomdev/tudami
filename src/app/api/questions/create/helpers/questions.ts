import { SupabaseClient } from "@supabase/supabase-js";
import { upOrAddReputationPoints } from "@/app/api/helpers/badgesAchievements";
import { asignBadgeQuestion } from "./achievements";

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
    throw new Error(`Error al crear la pregunta: ${error.message}`);
  }

  // Inserta tags en la tabla de relacion entre questions y tags
  await insertTags(data, tags, supabaseClient);

  // validar insignia de pregunta del usuario
  await asignBadgeQuestion(user_id, supabaseClient);

  // Asignar puntos de reputación al usuario
  await upOrAddReputationPoints(user_id, 5, supabaseClient);

  return {
    success: true,
    data,
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
