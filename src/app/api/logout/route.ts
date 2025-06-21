import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.delete("sb-token");
  return NextResponse.json({ ok: true });
}
