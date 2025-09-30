import { NextRequest, NextResponse } from "next/server";
import { sendMailConfirmUpdatePw } from "./helpers/sendMail";

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") || "";

  try {
    const res = await sendMailConfirmUpdatePw(email);
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error procesando emial", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
