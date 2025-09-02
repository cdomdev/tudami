import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateApprovalToken } from "@/app/api/auth/utils/generateTokenAprov";
import { supabaseAuth } from "@/utils/supabase/supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  getUserProfile,
} from "@/lib/user-profile";

/**
 * Ruta principal de autenticación - Maneja todo el flujo de inicio de sesión
 * Incluye: validación de sesión, generación de tokens, guardado en cookies, inicialización de usuario
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, refreshToken } = body;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Token de acceso requerido" },
        { status: 400 }
      );
    }

    // 1. Inicializar Supabase con el token de acceso
    const supabase = await supabaseAuth(accessToken);

    // 2. Validar el token de acceso y obtener el usuario autenticado
    let authUser;
    try {
      const validationResult = await validateAccessToken(accessToken, supabase);
      authUser = validationResult.data.user;
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error ? error.message : "Token de acceso inválido",
        },
        { status: 401 }
      );
    }

    // 3. Extraer datos del usuario autenticado
    const { id } = authUser;
    const full_name = authUser.user_metadata?.full_name || authUser.user_metadata?.user_name || "";
    const avatar_url =
      authUser.user_metadata?.picture || authUser.user_metadata?.avatar_url || "";
    const provider = authUser.app_metadata?.provider || "";

    // 4. Generar token de aprobación
    const approvalToken = generateApprovalToken(id);

      
    try {
      await upsertUserProfile({
        id,
        email: authUser.email,
        full_name: full_name || "",
        avatar_url: avatar_url,
        provider: provider,
        approvalToken,
        supabase,
      });
    } catch (error) {
      console.error("[AUTH] Error al insertar usuario:", error);
      return NextResponse.json(
        { error: "Error al crear/actualizar usuario" },
        { status: 500 }
      );
    }

    // 6. Configurar cookies de forma segura
    await setupAuthCookies({
      accessToken,
      refreshToken,
      approvalToken,
    });

    // 7. Crear preferencias por defecto solo si el usuario no las tiene
    try {
      await ensureUserPreferences(id, supabase);
    } catch (error) {
      console.error("Error al crear preferencias del usuario:", error);
      // No retornamos error aquí porque las preferencias pueden crearse después
    }

    //obtener datos del usuario para retornar
    let data;
    try {
      data = await getUserProfile(id, supabase);
    } catch (error) {
      console.error("Error al obtener perfil del usuario:", error);
      return NextResponse.json(
        { error: "Error obteniendo perfil del usuario" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Autenticación exitosa",
      user: data,
    });
  } catch (error) {
    console.error("Error en auth/login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * Valida el token de acceso con Supabase y retorna el usuario autenticado
 * @param accessToken Token de acceso a validar
 * @param supabase Instancia del cliente Supabase
 * @returns Objeto con datos del usuario y posible error
 * @throws Error si el token es inválido o requerido
 */
async function validateAccessToken(
  accessToken: string,
  supabase: SupabaseClient
) {
  if (!accessToken) {
    throw new Error("Token de acceso requerido");
  }

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error || !data) {
    throw new Error("Token de acceso inválido");
  }

  return { data, error: null };
}

/**
 * Inserta o actualiza el perfil del usuario en la base de datos
 * @param params Parámetros necesarios para actualizar el perfil
 * @returns Usuario actualizado
 * @throws Error si hay un problema al actualizar el usuario
 */
async function upsertUserProfile({
  id,
  email,
  full_name,
  avatar_url,
  provider,
  approvalToken,
  supabase,
}: {
  id: string;
  email: string | undefined;
  full_name: string;
  avatar_url: string;
  provider: string;
  approvalToken: string;
  supabase: SupabaseClient;
}) {
  const { error, data } = await supabase
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

  if (error) {
    throw new Error(`Error al actualizar perfil de usuario: ${error.message}`);
  }

  return data;
}

/**
 * Configura las cookies de autenticación en el navegador
 * @param params Tokens necesarios para la autenticación
 */
async function setupAuthCookies({
  accessToken,
  refreshToken,
  approvalToken,
}: {
  accessToken: string;
  refreshToken: string;
  approvalToken: string;
}) {
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

  // Cookie para refresh token (7 días)
  cookieStore.set("sb-refresh-token", refreshToken, {
    ...cookieOptions,
    // 7 días
    maxAge: 60 * 60 * 24 * 7,
  });

  // Cookie para el token de aprobación (1 día)
  cookieStore.set("approval_token", approvalToken, {
    ...cookieOptions,
    // 24 horas
    maxAge: 60 * 60 * 24,
  });
}

/**
 * Asegura que el usuario tenga preferencias creadas
 * @param userId ID del usuario
 * @param supabase Cliente de Supabase
 * @throws Error si hay un problema al crear las preferencias
 */
async function ensureUserPreferences(userId: string, supabase: SupabaseClient) {
  // Verificar si ya existen preferencias
  const { data: existingPreferences } = await supabase
    .from("user_profile_preferences")
    .select("user_id")
    .eq("user_id", userId)
    .single();

  // Solo crear preferencias si no existen
  if (!existingPreferences) {
    const { error } = await supabase.from("user_profile_preferences").insert({
      user_id: userId,
      profile_public: true,
      allow_email: false,
      allow_whatsapp: false,
    });

    if (error) {
      throw new Error(`Error al crear preferencias: ${error.message}`);
    }
  }
}
