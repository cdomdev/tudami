import { SupabaseClient } from "@supabase/supabase-js";
import { createAvatar } from "@dicebear/core";
import { adventurer} from "@dicebear/collection";
import sharp from "sharp";

async function getDataProfileUser(supabase: SupabaseClient) {
  return await supabase.auth.getUser();
}

// function que guarad datos en la tabla del perfil del usuario
export async function updateProfile(
  supabase: SupabaseClient,
  full_name: string
) {
  const dataUser = await getDataProfileUser(supabase);

  const { data: dataProfile } = dataUser;
  const id = dataProfile.user?.id || "";
  const email = dataProfile.user?.email;
  const seed = dataProfile.user?.id || "";
  const avatar_url = await generateAndSaveAvatarDefault(seed, supabase);

  const { error } = await supabase
    .from("users")
    .upsert([{ full_name, avatar_url, email, country: "Colombia" }])
    .select("id")
    .single();
  if (error) {
    throw new Error(error.message);
  }

  await definePreference(id, supabase);

  return {
    success: true,
    message: "Registro exitoso, ya puedes iniciar sesion",
  };
}

async function definePreference(user_id: string, supabase: SupabaseClient) {
  const { data: existingPreferences } = await supabase
    .from("user_profile_preferences")
    .select("user_id")
    .eq("user_id", user_id)
    .single();

  if (!existingPreferences) {
    const { error } = await supabase.from("user_profile_preferences").insert({
      user_id: user_id,
      profile_public: true,
      allow_email: false,
      allow_whatsapp: false,
    });

    if (error) {
      throw new Error(`Error al crear preferencias: ${error.message}`);
    }
  }
}

export async function generateAndSaveAvatarDefault(
  seed: string,
  supabase: SupabaseClient
) {
  const avatar = createAvatar(adventurer, { seed, size: 128 });
  const svg = avatar.toString();

  const webpBuffer = await sharp(Buffer.from(svg)).webp().toBuffer();

  const path = `default/${seed}.webp`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(path, webpBuffer, {
      contentType: "image/webp",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Error al guardar avatar: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);

  if (!data || !data.publicUrl) {
    throw new Error("No se pudo obtener la URL pública del avatar");
  }

  return data.publicUrl;
}
