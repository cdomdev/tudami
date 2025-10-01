import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { uploadImage } from "../../helpers/upload-image.helper";

export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const directory = url.searchParams.get("directory") || "";
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const slug = formData.get("slug") as string;

        if (!file || !slug) {
            return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
        }

        const supabase = await supabaseServerClient();

        // Procesar imagen: convertir a webp y comprimir
        const data = await uploadImage(supabase, file, slug, directory);

        return NextResponse.json({ url: data.url });
    } catch (error) {
        console.error("[API] Error inesperado:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
