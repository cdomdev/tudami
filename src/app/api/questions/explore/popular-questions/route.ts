import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const search = searchParams.get("search") || undefined;

  const questions = await getPopularQuestions(page, pageSize, search);
  return NextResponse.json(questions);
}

 async function getPopularQuestions(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const supabase = await supabaseServerClient();
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

  const dataLength = data?.length > 0 ? data : [];

  return dataLength;
}
