import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { SupabaseClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const { text, question_id, user_id } = await request.json();
  const supabase = await supabaseServerClient();
  const data = await createComment({
    content: text,
    question_id,
    user: { id: user_id },
    supabase,
  });
  return NextResponse.json(data);
}

async function createComment({
  content,
  question_id,
  user,
  supabase,
}: {
  content: string;
  question_id: number;
  user: { id: string };
  supabase: SupabaseClient;
}) {
  /**
   * Crear comentario en la base de datos
   */
  const { data: commentData, error } = await supabase
    .from("question_comments")
    .insert({
      text: content.trim(),
      question_id,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating comment:", error);
    return null;
  }
  /**
   * obtener autor de la pregunta para emitir la notificacion */

  const questionData = await getQuestionOwnerId(question_id, supabase);

  /**
   * Obtener la cantidad de comentarios
   */

  const count = await getCountComments(question_id, supabase);

  return { commentData, questionData, count };
}

// Función para obtener la cantidad de comentarios
async function getCountComments(question_id: number, supabase: SupabaseClient) {
  const { count, error } = await supabase
    .from("question_comments")
    .select("*", { count: "exact", head: true })
    .eq("question_id", question_id);

  if (error) {
    console.error("Error fetching comment count:", error);
    return 0;
  }

  return count;
}

// Función para obtener la data de una pregunta

async function getQuestionOwnerId(
  question_id: number,
  supabase: SupabaseClient
) {
  const { data: questionData, error } = await supabase
    .from("questions")
    .select("user_id")
    .eq("id", question_id)
    .single();

  if (error) {
    console.error("Error fetching question owner:", error);
    return null;
  }

  return questionData;
}
