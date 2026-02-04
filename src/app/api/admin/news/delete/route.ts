import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { deleteNewHelper } from "../../helpers/news";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  const supabase = await supabaseServerClient();

  try {
    const res = await deleteNewHelper(supabase, id);


    if (!res) {
      return NextResponse.json(
        { error: "No se pudo eliminar la noticia" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
