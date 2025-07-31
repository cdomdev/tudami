import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("slug") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const search = searchParams.get("search") || "";

  const questions = await getQuestionsByTag(tag, page, pageSize, search);
  return NextResponse.json(questions);
}

export async function getQuestionsByTag(
  tagSlug: string,
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = await supabaseServerClient();
  // Obtener el ID del tag por el slug
  const { data: tagData, error: tagError } = await supabase
    .from("tags")
    .select("id")
    .eq("slug", tagSlug)
    .single();

  if (tagError || !tagData) {
    console.error("Error al obtener el tag:", tagError);
    return [];
  }

  let query = supabase
    .from("view_all_questions")
    .select("*")
    .contains("tag_ids", [tagData.id])
    .range(from, to);

  // Filtro adicional por búsqueda (en título o contenido)
  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas por tag:", error);
    return [];
  }

  // Ordenar por cantidad de likes (ya que no hay .order por longitud en Supabase directamente)
  const sorted = (data ?? []).sort(
    (a, b) => (b.question_likes?.length ?? 0) - (a.question_likes?.length ?? 0)
  );

  return sorted;
}
