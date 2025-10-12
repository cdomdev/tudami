import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const questionId = url.searchParams.get("question_id");
  const userId = url.searchParams.get("user_id");
  if (!questionId || !userId) {
    return NextResponse.json("Missing question_id or user_id", { status: 400 });
  }
  const supabase = await supabaseServerClient();
  const { liked, error } = await toggleLike(
    Number(questionId),
    userId,
    supabase
  );
  if (error) {
    return new Response("Error al emitir like", { status: 500 });
  }

  return new Response(JSON.stringify({ liked }), { status: 200 });
}

async function toggleLike(
  questionId: number,
  user_id: string,
  supabase: SupabaseClient
) {
  try {
    const { data: existingLike, error: selectError } = await supabase
      .from("question_likes")
      .select("id")
      .eq("question_id", questionId)
      .eq("user_id", user_id)
      .maybeSingle();

    if (selectError) {
      return { liked: false, error: selectError };
    }

    if (existingLike) {
      const { error: deleteError } = await supabase
        .from("question_likes")
        .delete()
        .eq("question_id", questionId)
        .eq("user_id", user_id);

      if (deleteError) {
        throw new Error(`Error en el proceso:`, deleteError);
      }

      return { liked: false, error: deleteError };
    } else {
      const { error: insertError } = await supabase
        .from("question_likes")
        .insert({
          question_id: questionId,
          user_id,
        });

      if (insertError) {
        throw new Error(`Error en el proceso:`, insertError);
      }

      return { liked: true, error: insertError };
    }
  } catch (error) {
    console.error(`[toggleLike] Error inesperado:`, error);
    return { liked: false, error };
  }
}
