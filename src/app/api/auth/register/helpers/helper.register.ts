import { SupabaseClient } from "@supabase/supabase-js";
import { saveAvatarStorage } from "@/app/api/storage/storage";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import sharp from "sharp";
import nPayload from "@/content/notitications/notications-entity.json";
import { getRoleForNewUser } from "../../login/helpers/helper.authPro";
import { resend } from "@/emails/congif";
import { WelcomeTp } from "@/emails/Wellcome";

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
  const rol = await getRoleForNewUser(supabase);
  const { error } = await supabase
    .from("users")
    .upsert([
      { full_name, avatar_url, email, country: "Colombia", rol_id: rol.id },
    ])
    .select("id")
    .single();
  if (error) {
    throw new Error(error.message);
  }

  await definePreference(id, supabase);
  await generateNotificationWelcome(id, full_name, supabase);
  await mailWellcome(email, full_name);
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

export async function generateNotificationWelcome(
  user_id: string,
  full_name: string,
  supabase: SupabaseClient
) {
  if (!user_id) throw new Error("User not found");

  const notification = {
    user_id: user_id,
    actor_id: user_id,
    type: nPayload[3].type,
    entity_id: nPayload[3].id,
    entity_type: nPayload[3].entity_type,
    content: `Hola ${full_name}, bienvenido a Tudami, un espacio para aprender y crecer.
 \n Estamos emocionados de tenerte con nosotros y esperamos que disfrutes de la experiencia. \n Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.  \n ¡Feliz aprendizaje!. \n Puedes visitar y personalizar tu perfil haciendo clic sobre este mensaje.`,
    url: `/profile?id=${user_id}`,
    read: false,
  };

  const { error } = await supabase
    .from("notifications")
    .insert([notification])
    .select()
    .single();

  if (error) {
    console.error("Error creating notification:", error);
    throw new Error("Error creating notification");
  }
}

export async function mailWellcome(to: string, name: string) {
  try {
    
    const { data, error } = await resend.emails.send({
      from: "Tudami <team@info.tudami.com>",
      to: to,
      subject: "Bienvenido/a",
      react: WelcomeTp({ name: name }),
    });

    if (error) {
      console.error("Error enviando correo:", error);
      throw new Error("Error en el envio de mail:", { cause: error });
    }

    console.log("Correo enviado:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Fallo inesperado al enviar:", err);
    throw new Error("Error interno de envío:", {cause: err}) 
  }
}
