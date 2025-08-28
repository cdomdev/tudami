import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const pageStr = searchParams.get("page") || "1";
  const pageSizeStr = searchParams.get("pageSize") || "10";
  const search = searchParams.get("search") || "";
  
  if (!id) {
    return NextResponse.json({ error: "Missing question ID" }, { status: 400 });
  }

  // Convertir los strings a números
  const page = parseInt(pageStr, 10);
  const pageSize = parseInt(pageSizeStr, 10);
  
  // Validar que sean números válidos
  if (isNaN(page) || isNaN(pageSize)) {
    return NextResponse.json({ error: "Invalid page or pageSize format" }, { status: 400 });
  }

  const question = await getQuestionsById(page, pageSize, search, id);
  return NextResponse.json(question);
}

export async function getQuestionsById(
  page = 1,
  pageSize = 10,
  search?: string,
  id?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const supabase = await supabaseServerClient();
  let query = supabase
    .from("questions")
    .select(
      `
          id,
          title,
          content,
          created_at,
          users: user_id (
            id,
            full_name,
            avatar_url
          ),
          question_tags (
            tag:tags (
              id,
              name,
              color
            )
          ),
          question_likes (
            id
          ),
          question_comments (
            id
          )
         
        `
    )
    .range(from, to)
    .eq("id", id);

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas del usuario:", error);
    return [];
  }
  return data || [];
}
