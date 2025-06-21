import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  const cookieStore = await cookies();

  cookieStore.set("sb-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 1,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
