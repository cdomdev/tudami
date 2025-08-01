import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { title, content, tags } = await request.json();

    // Inicializa el cliente de Supabase
    const supabase = await supabaseServerClient();

    const result = await createQuestion(title, content, tags, supabase);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error en la creación de la pregunta:", error);
    return NextResponse.json(
      { error: "Error en la creación de la pregunta" },
      { status: 500 }
    );
  }
}
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
  tags: string[] = [],
  supabaseClient: SupabaseClient
): Promise<CreateQuestionResult> {
  const { data: sessionData } = await supabaseClient.auth.getUser();
  const userId = sessionData?.user?.id;

  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabaseClient
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
  await insertTags(data, tags, supabaseClient);

  // validar insignia de pregunta del usuario

  const datainsignia = await asignBadgeIfNeeded(userId, supabaseClient);

  // Asignar puntos de reputación al usuario
  await assignReputationPoints(userId, supabaseClient);

  // Retornar el resultado
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
async function asignBadgeIfNeeded(
  userId: string,
  supabaseClient: SupabaseClient
): Promise<AchievementData | null> {
  const { count } = await supabaseClient
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  let datainsignia: AchievementData | null = null;
  // 3. Otorgar la insignia si no la tiene aún
  if (count === 1) {
    const { data: insigniaData, error: insigniaError } = await supabaseClient
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

/**
 *
 * funcion para asiganar puntos de reputacion al usuario
 * @param userId - ID del usuario al que se le asignarán los puntos
 * @param supabaseClient - Cliente de Supabase
 */

async function assignReputationPoints(
  userId: string,
  supabaseClient: SupabaseClient
) {
  const { data: user, error: userError } = await supabaseClient
    .from("user_reputation")
    .select(`*`)
    .eq("user_id", userId)
    .single(); 
  // Si hay un error al obtener el usuario, lo manejamos
  if (userError) {
    if (userError.code === 'PGRST116') { 
      const { error: insertError } = await supabaseClient
        .from("user_reputation")
        .insert({ user_id: userId, score: 10 });
      
      if (insertError) {
        console.error("Error al crear registro de reputación:", insertError.message);
      }
      return;
    }

    console.error("Error al obtener usuario para asignar reputación:", userError.message);
    return;
  }

  const currentReputation = user?.score || 0;

  // Lógica para asignar puntos de reputación
  const newReputation = currentReputation + 10; 

  const { error: updateError } = await supabaseClient
    .from("user_reputation")
    .update({ score: newReputation })
    .eq("user_id", userId);

  if (updateError) {
    console.error("Error al actualizar reputación:", updateError.message);
  } else {
    console.log("Reputación actualizada:", newReputation);
  }
}
