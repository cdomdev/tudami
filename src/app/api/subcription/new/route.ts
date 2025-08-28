import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";


export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json(); 
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    const data = await subscribe(email);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}

async function subscribe(email: string) {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email });

  if (error) {
    console.error("Error subscribing to changes:", error);
  }

  return { data, error };
}
