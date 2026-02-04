import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { deleteUserHelper } from "@/app/api/admin/helpers/users";
import { requireAdmin } from "@/app/api/admin/helpers/auth";

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const supabase = await supabaseServerClient();

  try {
    if (!id) return NextResponse.json({ error: "Id requerido" }, { status: 400 });

    // Verificar autorización
    await requireAdmin(supabase);

    const res = await deleteUserHelper(supabase, id);
    return NextResponse.json(res);
  } catch (error) {
    console.error("Error en ruta DELETE /api/admin/users/delete", error);
    const message = error instanceof Error ? error.message : "Error interno del servidor";
    const status = message === "No autorizado" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
