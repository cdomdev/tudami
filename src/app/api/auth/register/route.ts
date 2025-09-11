import { NextRequest, NextResponse } from "next/server";
import { updateProfile } from "./helpers/helper.register";
import { supabaseAuth } from "@/utils/supabase/supabaseClient";

export async function POST(request: NextRequest) {
  const { full_name, email, access_token } = await request.json();
  if (!email || !full_name) {
    return NextResponse.json(
      { error: "Email and full_name are required" },
      { status: 400 }
    );
  }

  const supabase = await supabaseAuth(access_token);
  try {
    const res = await updateProfile(supabase, full_name);
    return NextResponse.json(res);
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
