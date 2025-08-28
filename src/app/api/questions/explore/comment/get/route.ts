import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const question_id = url.searchParams.get("question_id");
  const supabase = await supabaseServerClient();

  if (!question_id) {
    return NextResponse.json("Missing question_id", { status: 400 });
  }

  const { comments } = await getCommentBy(Number(question_id), supabase);
  return NextResponse.json(comments);
}

export async function getCommentBy(
  question_id: number,
  supabase: SupabaseClient
) {
  const { data, error } = await supabase
    .from("question_comments")
    .select(`*, users:users(id, full_name, avatar_url) `)
    .eq("question_id", question_id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error en getCommentBy:", error);
    throw new Error(error.message);
  }

  return { comments: data ?? [] };
}
