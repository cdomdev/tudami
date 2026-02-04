import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { getUsersHelper } from "@/app/api/admin/helpers/users";
import { requireAdmin } from "@/app/api/admin/helpers/auth";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const pageSize = Number(url.searchParams.get("pageSize")) || 10;
  const supabase = await supabaseServerClient();

  try {
    // Verificar autorización
    await requireAdmin(supabase);

    const res = await getUsersHelper(supabase, page, pageSize);
    return NextResponse.json(res);
  } catch (error) {
    console.error("Error en ruta GET /api/admin/users/get/list", error);
    const message = error instanceof Error ? error.message : "Error interno del servidor";
    const status = message === "No autorizado" || message === "No autenticado" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
