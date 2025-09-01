import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/utils/supabase/supabaseClient"

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("sb-access-token")?.value;
  const refreshToken = req.cookies.get("sb-refresh-token")?.value;

  if (!accessToken) {
    return redirectToLogin(req);
  }

  try {

    const { data: userSession, error: sessionError } = await supabase.auth.getUser(accessToken);

    if (userSession?.user && !sessionError) {
      return NextResponse.next();
    }

    if (refreshToken) {
      const url = req.nextUrl.clone();
      const originalPath = req.nextUrl.pathname;

      url.pathname = "/auth/validateSesion";
      url.search = `?redirectTo=${encodeURIComponent(originalPath)}`;

      return NextResponse.redirect(url);
    }

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
    "/questions/create",
    "/questions/create/:path*",
    "/questions/explore",
    "/questions/explore/:path*",
    "/offers/create",
    "/offers/create/:path*",
    "/offers/explore",
    "/offers/explore/:path*",
    "/profile-user",
    "/profile-user/:path*",
    "/view-profile-user",
    "/view-profile-user/:path*",
  ],
};
