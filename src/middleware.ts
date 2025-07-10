import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token")?.value;
  // const pathname = req.nextUrl.pathname;

  // console.log(`[MIDDLEWARE] Acceso a: ${pathname}, Token presente: ${!!token}`);

  // Si no hay token, redirigir al login
  if (!token) {
    // console.log(`[MIDDLEWARE] Sin token, redirigiendo a login con redirectTo=${pathname}`);
    return redirectToLogin(req);
  }

  // Por ahora, si hay token, asumimos que es válido
  // La validación real se hará en cada API route o componente si es necesario
  // console.log(`[MIDDLEWARE] Token presente, permitiendo acceso a: ${pathname}`);
  return NextResponse.next();
}

function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  const originalPath = req.nextUrl.pathname;

  url.pathname = "/";
  url.searchParams.set("redirectTo", originalPath);

  // console.log(`[MIDDLEWARE] Redirigiendo ${originalPath} → ${url.toString()}`);
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
