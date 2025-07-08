import { NextRequest, NextResponse } from "next/server";
import { generateApprovalToken } from "@/app/view-profile-user/lib/generateTokenProv";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const token = generateApprovalToken(userId);

    /**
     * setear token de aprovacion en una cookie
     */
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, 
      // 1 día
    };

    cookieStore.set("approval_token", token, cookieOptions);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
