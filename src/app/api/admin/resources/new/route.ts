import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { saveResourceHelper } from "../../helpers/save.helper";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const data = await req.json();
  const supabase = await supabaseServerClient();
  const isAdmin = searchParams.get("isAdmin") || false;

  try {
    const res = await saveResourceHelper(data, supabase, isAdmin);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
