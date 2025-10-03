import { SupabaseClient } from "@supabase/supabase-js";
export async function uploadImage(
    supabase: SupabaseClient,
    file: File,
    slug: string, 
    directory: string
) {
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Procesar imagen: convertir a webp y comprimir
    const fileName = `${slug.replaceAll(" ", "-").replaceAll(/[^\w\-]+/g, "")}-${Date.now()}.webp`;

    const { error: uploadError } = await supabase.storage
        .from(directory)
        .upload(fileName, buffer, {
            contentType: "image/webp",
            upsert: true,
        });

    if (uploadError) {
        console.error("[API] Error al subir a Supabase:", uploadError.message);
        throw new Error(uploadError.message);
    }

    const publicUrl = await getPublicUrl(fileName, supabase);

    return { url: publicUrl };
}



export async function getPublicUrl(fileName: string, supabase: SupabaseClient) {
    const { data } = supabase.storage.from("resources").getPublicUrl(fileName);
    if (!data?.publicUrl) {
        throw new Error("No se pudo obtener publicUrl");
    }
    return data.publicUrl;
}
