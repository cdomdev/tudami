import { supabase } from "@/lib/supabase";
import { buildQuestionsQuery } from "./buildQuestionsQuery";

export async function getPopularQuestions(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = buildQuestionsQuery().range(0, 999);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas populares:", error);
    return [];
  }

  const sorted = (data ?? []).sort(
    (a, b) => (b.question_likes?.length ?? 0) - (a.question_likes?.length ?? 0)
  );

  return sorted.slice(from, to);
}

export async function getUnansweredQuestions(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = buildQuestionsQuery()
    .eq("status", "pendiente")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query = query.ilike("title", `%${search}%`);
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

  let query = buildQuestionsQuery()
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas del usuario:", error);
    return [];
  }

  return data ?? [];
}
