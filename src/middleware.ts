import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hasToken = req.cookies.has("sb-access-token");

  if (!hasToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("redirectTo", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/create-questions",
    "/create-questions/:path*",
    "/explore-questions",
    "/explore-questions/:path*",
    "/profile",
    "/profile/:path*",
    "/ofertas/nueva",
  ],
};
