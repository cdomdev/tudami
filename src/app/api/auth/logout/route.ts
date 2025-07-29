import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateAuthFromCookie, handleApiError } from "@/lib/server-utils";
import { supabaseServerClient } from "@/lib/supabase-server";

/**
 * Cerrar sesión del usuario
 * Limpia cookies y invalida la sesión en Supabase
 */
export async function POST() {
  try {
    const cookieStore = await cookies();

    // 1. Intentar obtener el token para invalidar la sesión en Supabase
    try {
      const { token } = await validateAuthFromCookie();
      const supabase = supabaseServerClient(token);
      
      // Invalidar la sesión en Supabase
      await supabase.auth.admin.signOut(token);

      console.log('[AUTH] Sesión invalidada en Supabase');
    } catch {
      // Si no hay token válido, continuamos con la limpieza local
      console.log('[AUTH] No se pudo invalidar sesión en Supabase, limpiando cookies localmente');
    }

    // 2. Limpiar todas las cookies relacionadas con la autenticación
    const cookiesToClear = ['sb-access-token', 'approval_token', 'sb-refresh-token'];

    cookiesToClear.forEach(cookieName => {
      cookieStore.set(cookieName, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0, 
      });
    });

    console.log('[AUTH] Cookies de sesión limpiadas');

    return NextResponse.json({
      success: true,
      message: "Sesión cerrada exitosamente",
    });

  } catch (error) {
    const { error: errorMessage, status } = handleApiError(error);
    
    // Incluso si hay error, intentamos limpiar las cookies
    const cookieStore = await cookies();
    const cookiesToClear = ['sb-access-token', 'approval_token'];
    
    cookiesToClear.forEach(cookieName => {
      cookieStore.set(cookieName, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
    });

    return NextResponse.json({
      success: false,
      error: errorMessage,
    }, { status });
  }
}
