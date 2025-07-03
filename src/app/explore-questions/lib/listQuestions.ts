import { supabase } from "@/lib/supabase";

export async function fetchGeneralQuestions(page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await supabase
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
          name, 
          color
        )
      ),
      question_likes (
        id
      )
      `,
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error en home:", error);
    throw new Error(error.message);
  }

  return { questions: data ?? [], total: count ?? 0 };
}
