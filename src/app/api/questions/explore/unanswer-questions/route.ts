import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const search = searchParams.get("search") || undefined;

  const questions = await getUnansweredQuestionsApi(page, pageSize, search);
  return NextResponse.json(questions);
}

async function getUnansweredQuestionsApi(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const supabase = await supabaseServerClient();

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
