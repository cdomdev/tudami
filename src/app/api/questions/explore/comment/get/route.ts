import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const question_id = url.searchParams.get("question_id");
  const pageParam = url.searchParams.get("page");
  const pageSizeParam = url.searchParams.get("pageSize");
  const supabase = await supabaseServerClient();

  if (!question_id) {
    return NextResponse.json("Missing question_id", { status: 400 });
  }

  const page = pageParam ? Number(pageParam) : 1;
  const pageSize = pageSizeParam ? Number(pageSizeParam) : 5;

  const { comments, total } = await getCommentBy(
    Number(question_id),
    supabase,
    page,
    pageSize
  );

  return NextResponse.json({ comments, total });
}

async function getCommentBy(
  question_id: number,
  supabase: SupabaseClient
  , page = 1
  , pageSize = 5
) {
  const from = (page - 1) * pageSize;
  const to = page * pageSize - 1;

  const { data, error } = await supabase
    .from("question_comments")
    .select(`*, users:users(id, full_name, avatar_url) `)
    .eq("question_id", question_id)
    .order("created_at", { ascending: false })
    .range(from, to);

  // obtener conteo total
  const { count } = await supabase
    .from("question_comments")
    .select("*", { count: "exact", head: true })
    .eq("question_id", question_id);

  if (error) {
    console.error("Error en getCommentBy:", error);
    throw new Error(error.message);
  }

  return { comments: data ?? [], total: typeof count === "number" ? count : 0 };
}
