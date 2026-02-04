import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { updateUserHelper } from "@/app/api/admin/helpers/users";
import { requireAdmin } from "@/app/api/admin/helpers/auth";
import { UpdateUserSchema } from "@/app/api/admin/users/schemas";

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const supabase = await supabaseServerClient();

  try {
    if (!id) return NextResponse.json({ error: "Id requerido" }, { status: 400 });

    // Verificar autorización
    await requireAdmin(supabase);

    // Validar body
    const body = await req.json();
    const parsed = UpdateUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Payload inválido", details: parsed.error.errors }, { status: 400 });
    }

    const res = await updateUserHelper(supabase, id, parsed.data);
    return NextResponse.json(res);
  } catch (error) {
    console.error("Error en ruta PUT /api/admin/users/put", error);
    const message = error instanceof Error ? error.message : "Error interno del servidor";
    const status = message === "No autorizado" ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
