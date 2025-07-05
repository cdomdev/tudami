import { supabase } from "@/lib/supabase";
import { buildQuestionsQuery } from "./buildQuestionsQuery";

export async function getQuestionsByTags(page = 1, pageSize = 10, search?: string) {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = buildQuestionsQuery().range(0, 999)

  if (search) {
    query = query.ilike('title', `%${search}%`)
  }

  const { data: questions, error, count } = await query;

  if(er)

}