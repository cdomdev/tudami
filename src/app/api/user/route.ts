import { supabaseClient } from "@/utils/supabase/supabaseClient";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); 
    console.log("Obteniendo perfil del usuario con body:", body);
    const supabase = await supabaseClient();
    const { userId } = body;
    const { data: profileData, error } = await supabase.from("users")
       .select(`
      *,
      user_profile_preferences (
        profile_public,
        allow_email,
        allow_whatsapp
      ),
      questions(count),
      question_comments(count),
      user_achievements (
        achievement_id
      )
    `)
    .eq("id", userId)
    .single();

    if( error || !profileData) {
      return NextResponse.json(
        { error: "Error obteniendo perfil del usuario" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      profileData      
    });


  } catch (error) {
    console.error("Error en la obtención del perfil:", error);
       return NextResponse.json(
         { error: "Error interno del servidor" },
         { status: 500 }
       );
  }
}