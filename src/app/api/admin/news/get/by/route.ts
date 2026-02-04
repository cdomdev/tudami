import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { getNewBySlugHelper } from "../../../helpers/news";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug") || "";
  const supabase = await supabaseServerClient();
  try {
    const res = await getNewBySlugHelper(supabase, slug);
    if (!res) {
      return NextResponse.json(
        { error: "No se encontró la noticia" },
        { status: 404 }
      );
    }
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error en ruta de noticias", error);
    return NextResponse.json(
      { error: "Error interna en el servidor" },
      { status: 500 }
    );
  }
}
