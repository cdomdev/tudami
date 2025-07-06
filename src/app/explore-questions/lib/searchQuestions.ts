import { supabase } from "@/lib/supabase";

export async function searchQuestions(query: string, page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await supabase
    .from("questions")
    .select("*", { count: "exact" })
    .ilike("title", `%${query}%`)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Error en búsqueda:", error);
    throw new Error(error.message);
  }

  return { questions: data ?? [], total: count ?? 0 };
}
