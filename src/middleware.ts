import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("sb-access-token")?.value;

  if (!token) {
    return redirectToLogin(req);
  }

  return NextResponse.next();
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
