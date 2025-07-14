import { NextRequest } from "next/server";
import { supabaseServerClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";

/**
 * Utilidades para validación y autenticación en rutas de servidor
 */

/**
 * Valida el token de autorización desde el header Authorization
 */
export async function validateAuthToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    throw new Error("Token de autorización requerido");
  }
  const supabaseServer = supabaseServerClient(token);

  const {
    data: { user },
    error,
  } = await supabaseServer.auth.getUser(token);

  if (error || !user) {
    throw new Error("Token inválido o expirado");
  }

  return user;
}

/**
 * Valida el token desde las cookies (para usuarios autenticados)
 */
export async function validateAuthFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb-access-token")?.value;

  if (!token) {
    throw new Error("No hay sesión activa");
  }
  const supabaseServer = supabaseServerClient(token);

  const {
    data: { user },
    error,
  } = await supabaseServer.auth.getUser(token);

  if (error || !user) {
    throw new Error("Sesión expirada");
  }

  return { user, token };
}

/**
 * Obtiene el token de aprobación desde las cookies
 */
export async function getApprovalTokenFromCookie() {
  const cookieStore = await cookies();
  const approvalToken = cookieStore.get("approval_token")?.value;

  if (!approvalToken) {
    throw new Error("Token de aprobación no encontrado");
  }

  return approvalToken;
}

export async function validateUserOwnership(
  userId: string,
  requestedUserId: string
) {
  if (userId !== requestedUserId) {
    throw new Error("No tienes permisos para acceder a este recurso");
  }
}

export function sanitizeUserInput(data: Record<string, unknown>) {
  // Remover campos que no deberían ser modificables por el usuario
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, created_at, approval_token, ...sanitized } = data;
  return sanitized;
}

export function handleApiError(error: unknown) {
  console.error("API Error:", error);

  if (error instanceof Error) {
    return {
      error: error.message,
      status:
        error.message.includes("autorización") ||
        error.message.includes("Token")
          ? 401
          : error.message.includes("permisos")
          ? 403
          : 500,
    };
  }

  return { error: "Error interno del servidor", status: 500 };
}
