import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { generateApprovalToken } from "../utils/generateTokenAprov";
import { setCookiesRefresh } from "./helpers/helper.refresh";
import { getDataUser } from "../../user/helpers/helper.user";

const CONCURRENCY_LOCK_TIMEOUT = 30000;
let refreshInProgress = false;
let lastRefreshAttempt = 0;

export async function POST() {
  try {
    // Verificar si hay un refresco en curso para evitar múltiples intentos simultáneos
    const now = Date.now();
    if (refreshInProgress) {
      if (now - lastRefreshAttempt > CONCURRENCY_LOCK_TIMEOUT) {
        refreshInProgress = false;
      } else {
        return NextResponse.json(
          {
            error: "Refresco de sesión en curso, por favor espere.",
            code: "REFRESH_IN_PROGRESS",
            retryAfter: 2,
          },
          { status: 409 }
        );
      }
    }

    // Establecer el bloqueo
    refreshInProgress = true;
    lastRefreshAttempt = now;

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("sb-refresh-token")?.value;

    if (!refreshToken) {
      refreshInProgress = false;
      return NextResponse.json(
        { error: "No hay token de refresco disponible" },
        { status: 401 }
      );
    }
    const supabase = await supabaseServerClient();

    // Intentamos refrescar la sesión con el token proporcionado
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      console.error("Error al refrescar sesión:", error);
      refreshInProgress = false;

      // Si el error es por límite de tasa excedido
      if (error.status === 429 || error.code === "over_request_rate_limit") {
        // No eliminar las cookies en este caso, simplemente informar del error
        // para que el cliente pueda intentarlo más tarde
        return NextResponse.json(
          {
            error:
              "Se ha excedido el límite de solicitudes. Por favor, inténtalo de nuevo más tarde.",
            code: "RATE_LIMITED",
            details: error.message,
            retryAfter: 30,
          },
          { status: 429 }
        );
      }

      // Si el error es por token ya usado, limpiamos las cookies
      if (
        error.message?.includes("Already Used") ||
        error.code === "refresh_token_already_used"
      ) {
        // Eliminamos todas las cookies de autenticación
        cookieStore.delete("sb-refresh-token");
        cookieStore.delete("sb-access-token");
        cookieStore.delete("approval_token");

        return NextResponse.json(
          {
            error:
              "Algo salio mal al renovar la sesion, Por favor, inicie sesión nuevamente.",
            code: "SESSION_EXPIRED",
            details: error.message,
          },
          { status: 401 }
        );
      }

      // Para otros errores
      cookieStore.delete("sb-refresh-token");
      cookieStore.delete("sb-access-token");
      cookieStore.delete("approval_token");

      return NextResponse.json(
        { error: "Error al refrescar la sesión", details: error.message },
        { status: 401 }
      );
    }

    if (!data?.session) {
      refreshInProgress = false;
      return NextResponse.json(
        { error: "No se pudo obtener una nueva sesión" },
        { status: 401 }
      );
    }

    // token de aprovacion
    // Configurar cookies seguras
    const approvalToken = generateApprovalToken(data.session.user.id);
    const accessToken = data.session.access_token;
    const refreshTokenNew = data.session.refresh_token;

    await setCookiesRefresh(accessToken, refreshTokenNew, approvalToken);

    refreshInProgress = false;

    // obtener y nomalizar usuario para el contexto  

    const user = await getDataUser(data.session.user.id, supabase);

    return NextResponse.json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Error inesperado en renovación de sesión:", error);

    // Asegurarnos de liberar el bloqueo en caso de error
    refreshInProgress = false;

    // Limpiar las cookies por seguridad en caso de error severo
    const cookieStore = await cookies();
    cookieStore.delete("sb-refresh-token");
    cookieStore.delete("sb-access-token");
    cookieStore.delete("approval_token");

    return NextResponse.json(
      {
        error: "Error inesperado en renovación de sesión",
        code: "INTERNAL_ERROR",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
