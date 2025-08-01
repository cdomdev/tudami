import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");

  if (!userId) {
    return NextResponse.json({
      success: false,
      message: "ID de usuario no proporcionado",
    });
  }

  const profileData = await getDataProfilePublic(userId);

  return NextResponse.json(profileData);
}

async function getDataProfilePublic(userId: string) {
  const supabase = await supabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("users")
      .select(
        `
                id,
                full_name,
                avatar_url,
                email,
                phone,
                bio,
                country,
                city,
                department,
                created_at,
                user_profile_preferences (
                  profile_public,
                  allow_email,
                  allow_whatsapp
                ),
                questions(count),
                question_comments(count),
                user_reputation (
                  id,
                  score
                ) 
              `
      )
      .eq("id", userId)
      .single();

      console.log("Datos del perfil:", data);

    if (error || !data) {
      return { success: false, message: "Usuario no encontrado" };
    }
    return data;
  } catch (error) {
    console.error("Error al obtener datos del perfil:", error);
    return { success: false, message: "Error interno del servidor" };
  }
}
