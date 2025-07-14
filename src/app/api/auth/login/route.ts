import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabase-server";
import { getUserProfileQuery } from "@/lib/query";
import { cookies } from "next/headers";
import { generateSimpleApprovalToken } from "@/utils/generateToken";

/**
 * Ruta principal de autenticación - Maneja todo el flujo de inicio de sesión
 * Incluye: validación de sesión, generación de tokens, guardado en cookies, inicialización de usuario
 */
export async function POST(request: NextRequest) {
  try {
    // Validar configuración de Supabase antes de continuar
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("[AUTH] NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY no está configurada");
      return NextResponse.json(
        { error: "Error de configuración del servidor" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { accessToken } = body;
    const supabase = supabaseServerClient(accessToken);

    if (!accessToken) {
      return NextResponse.json(
        { error: "Token de acceso requerido" },
        { status: 400 }
      );
    }

    // 1. Validar el token de acceso con Supabase
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser(accessToken);

    if (authError || !authUser) {
      console.error("Error al validar token:", authError);
      return NextResponse.json(
        { error: "Token de acceso inválido" },
        { status: 401 }
      );
    }

    // 2. Extraer datos del usuario autenticado
    const { id, email, user_metadata, app_metadata } = authUser;
    const full_name = user_metadata?.full_name || user_metadata?.name || "";
    const avatar_url =
      user_metadata?.picture || user_metadata?.avatar_url || "";
    const provider = app_metadata?.provider || "email";

    // 3. Generar token de aprobación
    const approvalToken = generateSimpleApprovalToken(id);

    // 4. Insertar/actualizar usuario en la base de datos
    const { error: upsertError, data: upsertedUser } = await supabase
      .from("users")
      .upsert({
        id,
        email,
        full_name,
        avatar_url,
        provider,
        country: "Colombia",
        approval_token: approvalToken,
      })
      .select()
      .single();

    if (upsertError) {
      console.error(
        "[AUTH] Error al insertar usuario:",
        upsertError.message,
        upsertError
      );
      return NextResponse.json(
        { error: "Error al crear/actualizar usuario" },
        { status: 500 }
      );
    }

    // 5. Configurar cookies de forma segura
    const cookieStore = await cookies();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    };

    // Cookie para el token de acceso (1 día)
    cookieStore.set("sb-access-token", accessToken, {
      ...cookieOptions,
      // 24 horas
      maxAge: 60 * 60 * 24,
    });

    // Cookie para el token de aprobación (1 día)
    cookieStore.set("approval_token", approvalToken, {
      ...cookieOptions,
      // 24 horas
      maxAge: 60 * 60 * 24,
    });

    // 6. Crear preferencias por defecto solo si el usuario no las tiene
    const { data: existingPreferences } = await supabase
      .from("user_profile_preferences")
      .select("user_id")
      .eq("user_id", id)
      .single();

    // Solo crear preferencias si no existen
    if (!existingPreferences) {
      const { error: insertError } = await supabase
        .from("user_profile_preferences")
        .insert({
          user_id: id,
          profile_public: true,
          allow_email: false,
          allow_whatsapp: false,
        });

      if (insertError) {
        console.error(
          "Error al crear las preferencias del usuario:",
          insertError
        );
        // No retornamos error aquí porque las preferencias pueden crearse después
      }
    }

    // 7. Obtener perfil completo del usuario con todas las relaciones
    const { data: userProfile, error: profileError } =
      await getUserProfileQuery(id, supabase);

    if (profileError) {
      return NextResponse.json(
        { error: "Error obteniendo perfil del usuario" },
        { status: 500 }
      );
    }

    if (!userProfile) {
      return NextResponse.json(
        { error: "Error obteniendo perfil del usuario" },
        { status: 500 }
      );
    }
    // 8. Construir objeto de usuario completo para el contexto del cliente
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
        userProfile?.user_profile_preferences?.[0]?.profile_public ?? true,
      allow_email:
        userProfile?.user_profile_preferences?.[0]?.allow_email ?? false,
      allow_whatsapp:
        userProfile?.user_profile_preferences?.[0]?.allow_whatsapp ?? false,
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
      message: "Autenticación exitosa",
      user: userForContext,
    });
  } catch (error) {
    console.error("Error en auth/login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
