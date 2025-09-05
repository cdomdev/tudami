import { SupabaseClient } from "@supabase/supabase-js";
import sharp from "sharp";

/**
 * Procesa una imagen: redimensiona, convierte a webp y comprime.
 * @param buffer Buffer de la imagen original
 * @param width Ancho máximo (por defecto 512)
 * @param quality Calidad webp (por defecto 75)
 * @returns Buffer procesado
 */
export async function processImageToWebp(
  buffer: Buffer,
  width = 512,
  quality = 75
): Promise<Buffer> {
  return sharp(buffer).resize({ width }).webp({ quality }).toBuffer();
}

export async function uploadImage(
  supabase: SupabaseClient,
  file: File,
  userId: string
) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Procesar imagen: convertir a webp y comprimir
  const fileName = `${userId}-${Date.now()}.webp`;

  const { error: uploadError } = await supabase.storage
    .from("files")
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
  const { data } = supabase.storage.from("files").getPublicUrl(fileName);
  if (!data?.publicUrl) {
    throw new Error("No se pudo obtener publicUrl");
  }
  return data.publicUrl;
}
