import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const search = searchParams.get("search") || undefined;

  const questions = await fetchGeneralQuestions(page, pageSize, search);
  return NextResponse.json(questions);
}


async function fetchGeneralQuestions(
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const supabase = await supabaseServerClient();

  let query = supabase
    .from("view_all_questions")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("created_at", { ascending: false });

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
