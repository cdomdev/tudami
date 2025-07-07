import { supabase } from "@/lib/supabase";
import { buildQuestionsQuery } from "./buildQuestionsQuery";

export async function getQuestionsByTag(
  tagSlug: string,
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Primero obtenemos el ID del tag por su slug
  const { data: tagData, error: tagError } = await supabase
    .from("tags")
    .select("id")
    .eq("slug", tagSlug)
    .single();

  if (tagError || !tagData) {
    console.error("Error al obtener el tag:", tagError);
    return [];
  }

  // Luego obtenemos las preguntas que tienen este tag
  let query = buildQuestionsQuery().range(from, to).eq("question_tags.tag_id", tagData.id);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, error } = await query.range(from, to);

  if (error) {
    console.error("Error al obtener preguntas por tag:", error);
    return [];
  }

  // Ordenamos por popularidad (número de likes)
  const sorted = (data ?? []).sort(
    (a, b) => (b.question_likes?.length ?? 0) - (a.question_likes?.length ?? 0)
  );

  return sorted;
}
