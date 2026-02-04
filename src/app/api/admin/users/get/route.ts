import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { getUserByIdHelper } from "@/app/api/admin/helpers/users";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const supabase = await supabaseServerClient();

  try {
    if (!id) return NextResponse.json({ error: "Id requerido" }, { status: 400 });

    const res = await getUserByIdHelper(supabase, id);
    return NextResponse.json(res);
  } catch (error) {
    console.error("Error en ruta GET /api/admin/users/get", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
