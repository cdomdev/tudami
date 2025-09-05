import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { uploadImage } from "./helpers/helper.upload";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const supabase = await supabaseServerClient();

    // Procesar imagen: convertir a webp y comprimir
    const data = await uploadImage(supabase, file, userId);

    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error("[API] Error inesperado:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
