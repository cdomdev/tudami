import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseServerClient } from "@/lib/supabase-server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("sb-refresh-token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "No hay token de refresco disponible" },
        { status: 401 }
      );
    }

    // Creamos un cliente usando nuestro utility
    const dummyToken = "placeholder";
    const supabase = supabaseServerClient(dummyToken);

    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      console.error("Error al refrescar sesión:", error);
      cookieStore.delete("sb-refresh-token");
      cookieStore.delete("sb-access-token");
      cookieStore.delete("approval_token");
      return NextResponse.json(
        { error: "Error al refrescar la sesión", details: error.message },
        { status: 401 }
      );
    }

    if (!data?.session) {
      return NextResponse.json(
        { error: "No se pudo obtener una nueva sesión" },
        { status: 401 }
      );
    }

    // Actualizar cookies con los nuevos tokens
    const response = NextResponse.json({
      success: true,
      user: data.user,
    });

    // Configurar cookies seguras
    // 1 semana
    response.cookies.set("sb-access-token", data.session.access_token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    response.cookies.set("sb-refresh-token", data.session.refresh_token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error("Error inesperado en renovación de sesión:", error);
    return NextResponse.json(
      { error: "Error inesperado en renovación de sesión" },
      { status: 500 }
    );
  }
}
