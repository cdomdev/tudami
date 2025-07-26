import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/utils/supabase/supabaseClient";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  
  try {
    const supabase = await supabaseClient();
    console.log("Obteniendo preguntas con id:", id);

  //   obtener todasa las preguntas de un usuario
  if (!id) {
    console.error("ID de pregunta no proporcionado");
    return new Response(
      JSON.stringify({ error: "ID de pregunta no proporcionado" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { data, error } = await supabase
    .from("questions")
    .select(
      `created_at, id, title, 
       question_tags (
        tag:tags (
          id,
          name,
          color
        )
      ),  
      question_comments(count)`
    )
    .eq("user_id", id);
  if (error) {
    console.error("Error al obtener preguntas:", error);
    return new Response(
      JSON.stringify({ error: "Error al obtener preguntas", details: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error: unknown) {
    console.error("Error de autenticación:", error);
    
    // Verificar si es un error de JWT expirado
    if (
      (error instanceof Error && error.message.includes('JWT expired')) ||
      (typeof error === 'object' && error && 'code' in error && error.code === 'PGRST301')
    ) {
      return new Response(
        JSON.stringify({ 
          error: "Sesión expirada", 
          code: "AUTH_ERROR",
          message: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente." 
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    
    let errorMessage = "Error desconocido";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error && 'message' in error && typeof error.message === 'string') {
      errorMessage = error.message;
    }
    
    return new Response(
      JSON.stringify({ error: "Error en el servidor", details: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
