import { supabase } from "@/lib/supabase";
import { buildQuestionsQuery } from "./buildQuestionsQuery";

export async function fetchGeneralQuestions(page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await buildQuestionsQuery(from, to);

  if (error) {
    console.error("Error en home:", error);
    throw new Error(error.message);
  }

  return { questions: data ?? [], total: count ?? 0 };
}
