import { SupabaseClient } from "@supabase/supabase-js";
import { saveAvatarStorage } from "@/app/api/storage/storage";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import sharp from "sharp";
import nPayload from "@/content/notitications/notications-entity.json";

async function getDataProfileUser(supabase: SupabaseClient) {
  return await supabase.auth.getUser();
}

// function que guardar datos en la tabla del perfil del usuario
export async function updateProfile(
  supabase: SupabaseClient,
  full_name: string
) {
  const dataUser = await getDataProfileUser(supabase);

  const { data: dataProfile } = dataUser;
  const id = dataProfile.user?.id || "";
  const email = dataProfile.user?.email || "";
  const seed = dataProfile.user?.id + email || "";
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
  await generateNotificationWelcome(id, full_name, supabase);

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
): Promise<string> {
  // 1. Crear el avatar como Buffer
  const webpBuffer = await createAvatarDefault(seed);

  // 2. Convertir Buffer
  const uint8Array = new Uint8Array(webpBuffer);

  // 3. Guardar en storage
  const avatarUrl = await saveAvatarStorage(supabase, seed, uint8Array);

  return avatarUrl;
}

export async function createAvatarDefault(seed: string): Promise<Buffer> {
  const avatar = createAvatar(adventurer, { seed, size: 128 });
  const svg = avatar.toString();
  const webpBuffer = await sharp(Buffer.from(svg)).webp().toBuffer();
  return webpBuffer;
}

async function generateNotificationWelcome(
  user_id: string,
  full_name: string,
  supabase: SupabaseClient
) {
  if (!user_id) throw new Error("User not found");

  const notification = {
    user_id: user_id,
    actor_id: user_id,
    type: nPayload[0].type,
    entity_id: 1,
    entity_type: nPayload[3].entity_type,
    content: `Hola ${full_name}, bienvenido a Tudami, un espacio para aprender y crecer.
 \n Estamos emocionados de tenerte con nosotros y esperamos que disfrutes de la experiencia. \n Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. ¡Feliz aprendizaje!. \n Puedes visitar y personalizar tu perfil haciendo clic sobre este mensaje.`,
    url: `/profile-user?id=${user_id}`,
    read: false,
  };

  const { data, error } = await supabase
    .from("notifications")
    .insert([notification])
    .select()
    .single();

  if (error) {
    console.error("Error creating notification:", error);
    throw new Error("Error creating notification");
  }

  console.log("Notification created:", data);
}
