import { cookies } from "next/headers";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

/**
 * Renueva el token de sesión utilizando el token de refresco
 */

export async function refreshSession() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("sb-refresh-token")?.value;
    const supabase = await supabaseServerClient();
    if (!refreshToken) {
      throw new Error("No hay token de refresco disponible");
    }

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      throw error;
    }

    if (!data || !data.session) {
      throw new Error("No se pudo obtener una nueva sesión");
    }

    // Retornamos los tokens para que se puedan usar en el cliente
    return {
      accessToken: data.session?.access_token || "",
      refreshToken: data.session?.refresh_token || "",
      success: !!data.session,
      user: data.user,
    };
  } catch (error) {
    console.error("Error al refrescar la sesión:", error);
    return { success: false, error };
  }
}

/**
 * Verifica si un error está relacionado con una sesión expirada o inválida
 */
export function isSessionExpiredError(error: unknown): boolean {
  if (!error) return false;

  // Comprobar diferentes tipos de errores de sesión expirada
  if (error instanceof Error && error.message.includes("JWT expired")) {
    return true;
  }

  if (typeof error === "object" && error) {
    // Comprobar códigos de Supabase y PostgreSQL REST
    if (
      "code" in error &&
      (error.code === "PGRST301" ||
        error.code === "UNAUTHENTICATED" ||
        error.code === "401")
    ) {
      return true;
    }

    // Comprobar mensajes de error
    if (
      "message" in error &&
      typeof error.message === "string" &&
      (error.message.includes("expired") ||
        error.message.includes("invalid token") ||
        error.message.includes("session not found"))
    ) {
      return true;
    }
  }

  return false;
}
