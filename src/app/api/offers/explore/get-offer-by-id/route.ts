import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const pageStr = searchParams.get("page") || "1";
  const pageSizeStr = searchParams.get("pageSize") || "10";

  if (!id) {
    return NextResponse.json({ error: "Missing question ID" }, { status: 400 });
  }

  // Convertir los strings a números
  const page = parseInt(pageStr, 10);
  const pageSize = parseInt(pageSizeStr, 10);

  // Validar que sean números válidos
  if (isNaN(page) || isNaN(pageSize)) {
    return NextResponse.json(
      { error: "Invalid page or pageSize format" },
      { status: 400 }
    );
  }

  const question = await getOffersById(page, pageSize, id);
  return NextResponse.json(question);
}

async function getOffersById(page = 1, pageSize = 10, id?: string) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const supabase = await supabaseServerClient();
  const query = supabase
    .from("view_all_offers")
    .select(`*`)
    .range(from, to)
    .eq("id", id);

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener ofertas del usuario:", error);
    return [];
  }
  return data ?? [];
}
