import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  const supabase = await supabaseServerClient();
  
  try {
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    
    // Primero, obtenemos las IDs de las preguntas del usuario
    const { data: questionIds, error: questionError } = await supabase
      .from('questions')
      .select('id')
      .eq('user_id', userId);
      
    if (questionError) {
      console.error("Error fetching user questions:", questionError);
      return NextResponse.json(
        { error: "Error fetching user questions" },
        { status: 500 }
      );
    }
    
    // Si no hay preguntas, devolvemos una lista vacía
    if (!questionIds || questionIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }
    
    // Extraemos solo los IDs para la consulta siguiente
    const ids = questionIds.map(q => q.id);
    
    // Segundo, obtenemos las relaciones entre preguntas y tags
    const { data: questionTagsData, error: questionTagsError } = await supabase
      .from('question_tags')
      .select('tag_id')
      .in('question_id', ids);
      
    if (questionTagsError) {
      console.error("Error fetching question-tag relationships:", questionTagsError);
      return NextResponse.json(
        { error: "Error fetching question-tag relationships" },
        { status: 500 }
      );
    }
    
    // Si no hay relaciones, devolvemos una lista vacía
    if (!questionTagsData || questionTagsData.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }
    
    // Extraemos los IDs de los tags
    const tagIds = questionTagsData.map(qt => qt.tag_id);
    
    // Tercero, obtenemos la información de los tags
    const { data: tagData, error: tagError } = await supabase
      .from('tags')
      .select('id, name, color, slug')
      .in('id', tagIds);
      
    if (tagError) {
      console.error("Error fetching user tags:", tagError);
      return NextResponse.json(
        { error: "Error fetching user tags" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: tagData || [],
    });
  } catch (error) {
    console.error("Error al obtener tags del usuario:", error);
    return NextResponse.json(
      { error: "Error al obtener tags del usuario" },
      { status: 500 }
    );
  }
}
