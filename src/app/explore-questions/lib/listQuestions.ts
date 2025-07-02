import { supabase } from "@/lib/supabase";

interface FetchQuestionParams {
  pageSize?: number;
  page?: number;
  topic?: string;
  sort?: "recent" | "popular" | "commented";
  search?: string;
}

export async function fetchQuestions({
  pageSize = 10,
  page = 1,
  topic,
  sort = "recent",
  search,
}: FetchQuestionParams) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
let query = supabase
  .from("questions")
  .select(
    `
    *,
    users:users (
      id,
      full_name,
      avatar_url
    ),
    question_tags (
      tag:tags (
        id,
        name
      )
    ),
    question_likes (
      id,
      user_id,
      users (
        id,
        full_name
      )
    )
    `,
    { count: "exact" }
  )
  .range(from, to);


  // Búsqueda
  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  // Filtro por tema (tag)
  if (topic) {
    query = query.contains("questions_tags", [{ tag: { name: topic } }]);
    // Otra forma (más directa si topic es el ID del tag):
    // query = query.contains("questions_tags", [{ tag_id: topic }]);
  }

  // Ordenamiento
  switch (sort) {
    case "popular":
      query = query.order("likes_count", { ascending: false }); // si tienes likes
      break;
    case "commented":
      query = query.order("comments_count", { ascending: false }); // si tienes comentarios
      break;
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas:", error);
    throw new Error(error.message);
  }

  return {
    questions: data || [],
    total: count || 0,
    page,
    pageSize,
  };
}
