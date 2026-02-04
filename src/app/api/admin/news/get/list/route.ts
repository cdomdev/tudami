import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { getNews } from "../../../helpers/news";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const pageSize = Number(url.searchParams.get("pageSize")) || 10;
  const supabase = await supabaseServerClient();
  try {
    const res = await getNews(supabase, page, pageSize);
    if (!res) {
      return NextResponse.json(
        { error: "No se encontraron noticias" },
        { status: 404 }
      );
    }
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error en ruta de recursos", error);
    return NextResponse.json(
      { error: "Error interna en el servidor" },
      { status: 500 }
    );
  }
}
