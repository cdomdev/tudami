import { supabase } from "@/lib/supabase";

/**
 *
 * This function fetches general questions with pagination
 */
export async function fetchGeneralQuestions(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("view_all_questions")
    .select("*", { count: "exact" })
    .range(from, to);

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("Error en home:", error);
    throw new Error(error.message);
  }

  return { questions: data ?? [], total: count ?? 0 };
}

/**
 *
 *
 */
export async function getPopularQuestions(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("view_popular_questions")
    .select(`*`)
    .range(from, to);

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas populares:", error);
    return [];
  }
  return data ?? [];
}

export async function getUnansweredQuestions(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("view_unanswered_questions")
    .select("*")
    .range(from, to);

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas sin responder:", error);
    return [];
  }

  return data ?? [];
}

export async function getMyQuestions(page = 1, pageSize = 10, search?: string) {
  const user = (await supabase.auth.getUser()).data?.user;
  if (!user) return [];

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("view_all_questions")
    .select("*")
    .range(from, to)
    .eq("user_id", user.id);

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas del usuario:", error);
    return [];
  }

  return data ?? [];
}

export async function getQuestionsById(
  page = 1,
  pageSize = 10,
  search?: string,
  id?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("questions")
    .select(
      `
    id,
      title,
      content,
      created_at,
      user: user_id (
        id,
        full_name,
        avatar_url
      ),
      question_tags (
        tag:tags (
          id,
          name,
          color
        )
      ),
      question_likes (
        id
      ),
      question_comments (
        id
      )
    `
    )
    .range(from, to)
    .eq("id", id);

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas del usuario:", error);
    return [];
  }

  return data ?? [];
}
