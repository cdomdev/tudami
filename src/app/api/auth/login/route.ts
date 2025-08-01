import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { generateApprovalToken } from "@/app/api/auth/utils/generateTokenAprov";
import { supabaseAuth } from "@/utils/supabase/supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { getUserProfile, buildUserContextObject } from "@/lib/user-profile";

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
    const { id, email, user_metadata, app_metadata } = authUser;
    const full_name = user_metadata?.full_name || user_metadata?.name || "";
    const avatar_url =
      user_metadata?.picture || user_metadata?.avatar_url || "";
    const provider = app_metadata?.provider || "email";

    // 4. Generar token de aprobación
    const approvalToken = generateApprovalToken(id);

    // 5. Insertar/actualizar usuario en la base de datos
    let upsertedUser;
    try {
      upsertedUser = await upsertUserProfile({
        id,
        email,
        full_name,
        avatar_url,
        provider,
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

    // 8. Obtener perfil completo del usuario y crear objeto para el contexto
    let userForContext;
    try {
      userForContext = await prepareUserContextObject({
        id,
        email,
        full_name,
        avatar_url,
        provider,
        upsertedUser,
        supabase,
      });
    } catch (error) {
      console.error("Error al construir objeto de usuario:", error);
      return NextResponse.json(
        { error: "Error obteniendo perfil del usuario" },
        { status: 500 }
      );
    }

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

// Definimos un tipo para el usuario que se inserta en la base de datos
type UpsertedUser = {
  phone?: string;
  bio?: string;
  approval_token?: string;
  created_at?: string;
  // Otros campos específicos pueden añadirse aquí
  [key: string]: string | number | boolean | null | undefined;
};

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

/**
 * Prepara y construye el objeto de usuario completo para el contexto del cliente
 * Esta función obtiene el perfil del usuario y luego usa buildUserContextObject 
 * de la utilidad centralizada para crear el objeto final
 */
async function prepareUserContextObject({
  id,
  email,
  full_name,
  avatar_url,
  provider,
  upsertedUser,
  supabase,
}: {
  id: string;
  email: string | undefined;
  full_name: string;
  avatar_url: string;
  provider: string;
  upsertedUser: UpsertedUser;
  supabase: SupabaseClient;
}) {
  // Obtener perfil completo con todas las relaciones
  const { data: userProfile, error: profileError } = await getUserProfileQuery(
    id,
    supabase
  );

  if (profileError || !userProfile) {
    throw new Error(
      `Error obteniendo perfil: No se encontró el perfil`
    );
  }

  // Construir objeto de usuario para el contexto usando la función centralizada
  // Combinamos los datos del perfil con los datos actualizados del usuario
  const mergedProfile = {
    ...userProfile,
    phone: upsertedUser?.phone ?? userProfile?.phone,
    bio: upsertedUser?.bio ?? userProfile?.bio,
    approval_token: upsertedUser?.approval_token,
    created_at: upsertedUser?.created_at ?? userProfile?.created_at,
  };
  
  return buildUserContextObject({
    id,
    email,
    full_name,
    avatar_url,
    provider,
    userProfile: mergedProfile,
  });
}


/**
 * Consulta el perfil del usuario con todas sus relaciones
 * Esta función es un wrapper sobre getUserProfile para mantener la compatibilidad
 */
async function getUserProfileQuery(userId: string, client: SupabaseClient) {
  if (!userId) {
    throw new Error("ID de usuario requerido para obtener perfil");
  }

  try {
    const data = await getUserProfile(userId, client);
    return { data, error: null };
  } catch (error) {
    console.error("Error al obtener perfil de usuario:", error);
    throw new Error(`Error obteniendo perfil: ${error instanceof Error ? error.message : String(error)}`);
  }
}
