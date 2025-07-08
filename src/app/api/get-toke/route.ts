
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("sb-access-token")?.value;

    if (!token) {
      return NextResponse.json({ token: null }, { status: 401 });
    }

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Failed request cookie ", error);
    return NextResponse.json({ token: null }, { status: 500 });
  }
}