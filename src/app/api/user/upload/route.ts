import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      console.error("[API] Faltan datos", { file, userId });
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const supabase = await supabaseServerClient();

    const fileExt = file.name.split(".").pop();
    const fileName = `default/${userId}/${Date.now()}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

      if (uploadError) {
      console.error("[API] Error al subir a Supabase:", uploadError.message);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

    if (!data?.publicUrl) {
      console.error("[API] No se pudo obtener publicUrl");
      return NextResponse.json({ error: "No se pudo obtener publicUrl" }, { status: 500 });
    }

    return NextResponse.json({ url: data.publicUrl });
  } catch (error) {
    console.error("[API] Error inesperado:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
