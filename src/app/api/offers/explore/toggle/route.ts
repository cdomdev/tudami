import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offer_id = searchParams.get("offer_id");
  const user_id = searchParams.get("user_id");
  const supabase = await supabaseServerClient();
  if (!offer_id || !user_id)
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  try {
    const res = await checkIfApply(Number(offer_id), user_id, supabase);
    console.log("Toggle apply response[API]:", res);
    return NextResponse.json(res);
  } catch (error) {
    console.error("Error delete application", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export const checkIfApply = async (
  offer_id: number,
  user_id: string,
  supabase: SupabaseClient
) => {
  const { data } = await supabase
    .from("offers_applications")
    .select("id")
    .eq("offer_id", offer_id)
    .eq("user_id", user_id)
    .maybeSingle();
  return !!data;
};
