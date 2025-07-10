import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { getUserProfileQuery } from "@/lib/query";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id, 
      email, 
      full_name, 
      avatar_url, 
      provider, 
      approval_token 
    } = body;

    // Validar datos requeridos
    if (!id || !email) {
      return NextResponse.json(
        { error: "ID de usuario y email son requeridos" },
        { status: 400 }
      );
    }

    // 1. Insertar/actualizar usuario en la tabla users
    const { error: upsertError, data: upsertedUser } = await supabaseServer
      .from("users")
      .upsert({
        id,
        email,
        full_name,
        avatar_url,
        provider,
        country: "Colombia",
        approval_token,
      })
      .select()
      .single();

    if (upsertError) {
      console.error("Error al insertar usuario:", upsertError.message);
      return NextResponse.json(
        { error: "Error al crear/actualizar usuario" },
        { status: 500 }
      );
    }

    // 2. Crear preferencias por defecto solo si el usuario no las tiene configuradas
    const { data: existingPreferences } = await supabaseServer
      .from("user_profile_preferences")
      .select("user_id")
      .eq("user_id", id)
      .single();

    // Solo crear preferencias si no existen
    if (!existingPreferences) {
      const { error: insertError } = await supabaseServer
        .from("user_profile_preferences")
        .insert({
          user_id: id,
          profile_public: true,
          allow_email: false,
          allow_whatsapp: false,
        });

      if (insertError) {
        console.error("Error al crear las preferencias del usuario:", insertError);
        // No retornamos error aquí porque las preferencias pueden crearse después
      }
    }

    // 3. Obtener perfil completo del usuario
    const { data: userProfile } = await getUserProfileQuery(id);

    if (!userProfile) {
      return NextResponse.json(
        { error: "Error obteniendo perfil del usuario" },
        { status: 500 }
      );
    }

    // 4. Construir objeto de usuario completo para el contexto
    const userForContext = {
      id,
      email: email || "",
      full_name,
      avatar_url,
      provider,
      phone: upsertedUser?.phone ?? "",
      bio: upsertedUser?.bio ?? "",
      city: userProfile?.city ?? "",
      department: userProfile?.department ?? "",
      country: userProfile?.country ?? "Colombia",
      approval_token: upsertedUser?.approval_token ?? "",
      created_at: upsertedUser?.created_at ?? new Date().toISOString(),
      profile_public:
        userProfile?.user_profile_preferences?.profile_public ?? true,
      allow_email:
        userProfile?.user_profile_preferences?.allow_email ?? false,
      allow_whatsapp:
        userProfile?.user_profile_preferences?.allow_whatsapp ?? false,
      reputation: {
        questions: userProfile.questions?.[0]?.count ?? 0,
        responses: userProfile.question_comments?.[0]?.count ?? 0,
        score: "bronze",
        achievement: {
          achievement_id:
            userProfile.user_achievements?.[0]?.achievement_id ?? null,
        },
      },
    };

    return NextResponse.json({
      success: true,
      user: userForContext,
    });

  } catch (error) {
    console.error("Error en initialize-user:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
