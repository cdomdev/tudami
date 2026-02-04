import { NextRequest } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { updateResourceHelper } from "../../helpers/resources";

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const data = await req.json();
  const supabase = await supabaseServerClient();
  const idParam = searchParams.get("id");

  if (!idParam) {
    return new Response(JSON.stringify({ error: "ID inválido" }), {
      status: 400,
    });
  }

  const id = Number(idParam);
  try {
    const res = await updateResourceHelper(data, supabase, id);
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.log("Erro interno del servidor", error)
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
}
