import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/utils/supabase/supabaseClient";
import { supabaseServerClient } from "./utils/supabase/supabaseServerClient";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("sb-access-token")?.value;
  const refreshToken = req.cookies.get("sb-refresh-token")?.value;

  if (!accessToken) {
    return redirectToLogin(req);
  }

  try {
    const { data: userSession, error: sessionError } =
      await supabase.auth.getUser(accessToken);

    if (sessionError || !userSession?.user) {
      return redirectToLogin(req);
    }

    // vaidar si entre a ruta admin

    const userId = userSession.user?.id;
    const pathname = req.nextUrl.pathname;
    if (pathname.startsWith("/admin")) {
      const supabaseSSC = await supabaseServerClient();
      const { data: userData, error } = await supabaseSSC
        .from("v_user_context")
        .select("role")
        .eq("id", userId)
        .single();
      if (error || !userData) {
        return NextResponse.redirect("/");
      }
      console.log(userData)
      if (userData.role !== "admin_tudami") {
        // Podrías redirigir a 403 o home
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    if (refreshToken) {
      const url = req.nextUrl.clone();
      const originalPath = req.nextUrl.pathname;

      url.pathname = "/auth/validateSesion";
      url.search = `?redirectTo=${encodeURIComponent(originalPath)}`;

      return NextResponse.redirect(url);
    }
    return NextResponse.next();
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
    "/admin",
    "/admin/:path*",
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
