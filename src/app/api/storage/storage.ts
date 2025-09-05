import { SupabaseClient } from "@supabase/supabase-js"

export async function saveAvatarStorage(
  supabase: SupabaseClient,
  seed: string,
  webpData: ArrayBuffer | Uint8Array | Blob
): Promise<string> {
  
  const path = `default/${seed}.webp`

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, webpData, {
      contentType: "image/webp",
      upsert: true,
    })

  if (uploadError) {
    throw new Error(`Error al guardar avatar: ${uploadError.message}`)
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(path)

  if (!data?.publicUrl) {
    throw new Error("No se pudo obtener la URL pública del avatar")
  }

  return data.publicUrl
}

