import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { listaAllDataResource } from "../helper/listaData";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const pageSize = Number(url.searchParams.get("pageSize")) || 10;
  const supabase = await supabaseServerClient();
  try {
    const res = await listaAllDataResource(supabase, page, pageSize);
    return NextResponse.json(res);
  } catch (error) {
    console.log("Error en ruta de recursos", error);
    return NextResponse.json(
      { error: "Error interna en el servidor" },
      { status: 400 }
    );
  }
}
