import { NextResponse, NextRequest } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import {  deleteDetailsResourceHelper } from "../../helpers/save.helper";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const supabase = await supabaseServerClient();
  const id = searchParams.get("id");
  try {
    const res = await deleteDetailsResourceHelper(supabase, Number(id));
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
