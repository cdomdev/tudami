import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { NextRequest, NextResponse } from "next/server";
import { toggleLike } from "../helpers/index";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const questionId = url.searchParams.get("question_id");
  const userId = url.searchParams.get("user_id");
  
  if (!questionId || !userId) {
    return NextResponse.json("Missing question_id or user_id", { status: 400 });
  }
  const supabase = await supabaseServerClient();
  try {
    const { liked, error } = await toggleLike(
      Number(questionId),
      userId,
      supabase
    );
    if (error) {
      return new Response("Error al emitir like", { status: 500 });
    }

    return new Response(JSON.stringify({ liked }), { status: 200 });
  } catch (error) {
    NextResponse.json(error);
  }
}
