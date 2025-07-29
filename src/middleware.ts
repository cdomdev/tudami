import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js"; // Mantenemos esta importación porque en middleware no podemos usar el cliente del servidor

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("sb-access-token")?.value;
  const refreshToken = req.cookies.get("sb-refresh-token")?.value;

  // Si no hay token de acceso, redirigir a login
  if (!accessToken) {
    return redirectToLogin(req);
  }

  try {
    // Intentar verificar el token de acceso
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: userSession, error: sessionError } = await supabase.auth.getUser(accessToken);

    // Si el token es válido, permitir la solicitud
    if (userSession?.user && !sessionError) {
      return NextResponse.next();
    }

    // Si el token no es válido pero hay un token de refresco, intentar renovar la sesión
    if (refreshToken) {
      // En lugar de renovar aquí, redirigimos a una ruta especial
      const url = req.nextUrl.clone();
      const originalPath = req.nextUrl.pathname;
      
      url.pathname = "/auth/validateSesion";
      url.search = `?redirectTo=${encodeURIComponent(originalPath)}`;
      
      return NextResponse.redirect(url);
    }

    // Si no hay token de refresco o hay algún otro problema, redirigir a login
    return redirectToLogin(req);
  } catch (error) {
    console.error("Error en middleware:", error);
    return redirectToLogin(req);
  }
}

function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  const originalPath = req.nextUrl.pathname;

  url.pathname = "/auth/login";
  url.search = `?redirectTo=${encodeURIComponent(originalPath)}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/create-questions",
    "/create-questions/:path*",
    "/explore-questions",
    "/explore-questions/:path*",
    "/profile-user",
    "/profile-user/:path*",
    "/view-profile-user",
    "/view-profile-user/:path*",
  ],
};
