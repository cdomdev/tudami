import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabase } from "@/utils/supabase/supabaseClient";
import { supabaseServerClient } from "./utils/supabase/supabaseServerClient";
export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("sb-access-token")?.value;

  if (!accessToken) {
    return redirectToLogin(req);
  }

  try {
    const { data: userSession, error: sessionError } =
      await supabase.auth.getUser(accessToken);

    if (sessionError || !userSession?.user) {
      return redirectToLogin(req);
    }

    const userId = userSession.user.id;
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/admin")) {
      const supabaseSSC = await supabaseServerClient();
      const { data: userData, error } = await supabaseSSC
        .from("v_user_context")
        .select("role")
        .eq("id", userId)
        .single();

      if (error || !userData || userData.role !== "admin_tudami") {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error en middleware:", error);
    return redirectToLogin(req);
  }
}


function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  const originalUrl = req.nextUrl.pathname + req.nextUrl.search;

  url.pathname = "/auth/login";
  url.search = `?redirectTo=${encodeURIComponent(originalUrl)}`;

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
    "/resources/new",
    "/resources/new:path*"
  ],
};
