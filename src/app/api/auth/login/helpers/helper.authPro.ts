import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Valida el token de acceso con Supabase y retorna el usuario autenticado
 * @param accessToken Token de acceso a validar
 * @param supabase Instancia del cliente Supabase
 * @returns Objeto con datos del usuario y posible error
 * @throws Error si el token es inválido o requerido
 */
export async function validateAccessToken(
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
export async function upsertUserProfile({
  id,
  email,
  full_name,
  avatar_url,
  approvalToken,
  supabase,
}: {
  id: string;
  email: string | undefined;
  full_name: string;
  avatar_url: string;
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
export async function setupAuthCookies({
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
export async function ensureUserPreferences(userId: string, supabase: SupabaseClient) {
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
