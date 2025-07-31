import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, content, tags } = await request.json();
    const result = await createQuestion(title, content, tags);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error en la creación de la pregunta:", error);
    return NextResponse.json(
      { error: "Error en la creación de la pregunta" },
      { status: 500 }
    );
  }
}

const supabase = await supabaseServerClient();
// Definimos tipos para la estructura de datos
type AchievementData = {
  user_id: string;
  achievement_id: string;
  created_at?: string;
  id?: string;
}[];

// Definimos un tipo de retorno para la función createQuestion
type CreateQuestionResult = {
  success: boolean;
  data?: QuestionData;
  datainsignia?: AchievementData | null;
  error?: string;
};

export async function createQuestion(
  title: string,
  content: string,
  tags: string[] = []
): Promise<CreateQuestionResult> {
  const { data: sessionData } = await supabase.auth.getUser();
  const userId = sessionData?.user?.id;

  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from("questions")
    .insert([
      {
        user_id: userId,
        title,
        content,
        status: "pendiente",
      },
    ])
    .select("id");

  if (error) {
    throw new Error(`Error al guardar en Supabase: ${error.message}`);
  }

  // // inserta tags en la tabla de relacion entre questions y tags
  await insertTags(data, tags);

  // validar insignia de pregunta del usuario

  const datainsignia = await asignBadgeIfNeeded(userId);

  return {
    success: true,
    data,
    datainsignia,
  };
}

// Definimos un tipo para la estructura de datos que devuelve Supabase al insertar una pregunta
type QuestionData = {
  id: string;
}[];

// Inserta tags en la tabla de relación entre questions y tags
async function insertTags(data: QuestionData, tags: string[]) {
  if (data && tags.length > 0) {
    const tagInserts = tags.map((tag: string) => ({
      question_id: data[0]?.id,
      tag_id: tag,
    }));

    const { error: tagError } = await supabase
      .from("question_tags")
      .insert(tagInserts);

    if (tagError) {
      throw new Error(`Error al insertar tags: ${tagError.message}`);
    }
  }
}
/**
 *
 * Asigna una insignia al usuario si cumple con los criterios
 * @param userId - ID del usuario al que se le asignará la insignia
 * @returns Promise que resuelve a los datos de la insignia o null si no se asignó
 */
async function asignBadgeIfNeeded(userId: string): Promise<AchievementData | null> {
  const { count } = await supabase
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  let datainsignia: AchievementData | null = null;
  // 3. Otorgar la insignia si no la tiene aún
  if (count === 1) {
    const { data: insigniaData, error: insigniaError } = await supabase
      .from("user_achievements")
      .insert([{ user_id: userId, achievement_id: "primera_pregunta" }]);

    if (insigniaError && insigniaError.code !== "23505") {
      console.error("Error otorgando insignia:", insigniaError.message);
    } else if (!insigniaError) {
      console.log("🎉 Insignia 'primera_pregunta' otorgada!");
      // Convertir a tipo seguro
      if (insigniaData) {
        datainsignia = insigniaData as unknown as AchievementData;
      }
    }
  }
  return datainsignia;
}
