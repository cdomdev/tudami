import { NextRequest, NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";
// import { createAvatar } from "@dicebear/core";
// import { thumbs } from "@dicebear/collection";
// import sharp from "sharp";
import { supabaseAuth } from "@/utils/supabase/supabaseClient";

export async function POST(request: NextRequest) {
  const { full_name, email, access_token } = await request.json();
  if (!email || !full_name) {
    return NextResponse.json(
      { error: "Email and full_name are required" },
      { status: 400 }
    );
  }

  const supabase = await supabaseAuth(access_token);

  try {
    const res = await updateProfile(supabase, full_name);

    return NextResponse.json(res);
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function getDataProfileUser(supabase: SupabaseClient) {
  return await supabase.auth.getUser();
}

// function que guarad datos en la tabla del perfil del usuario
async function updateProfile(supabase: SupabaseClient, full_name: string) {
  const dataUser = await getDataProfileUser(supabase);

  const { data: dataProfile } = dataUser;
  const id = dataProfile.user?.id || "";
  const email = dataProfile.user?.email;
  // const seed = dataProfile.user?.id || "";
  // const avatar_url = await generateAndSaveAvatarDefault(seed, supabase);

  // console.log("avatar defualt para perfil en el registro --->", avatar_url);

  const { error } = await supabase
    .from("users")
    .upsert([{ full_name,  email, country: "Colombia" }])
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

// async function generateAndSaveAvatarDefault(
//   seed: string,
//   supabase: SupabaseClient
// ) {
//   // 1. Generar SVG
//   const avatar = createAvatar(thumbs, { seed, size: 128 });
//   const svg = avatar.toString();

//   // 2. Convertir SVG -> WebP con sharp (en backend)
//   const webpBuffer = await sharp(Buffer.from(svg)).webp().toBuffer();

//   // 3. Subir a Supabase
//   const { error } = await supabase.storage
//     .from("avatars")
//     .upload(`default/${seed}.webp`, webpBuffer, {
//       contentType: "image/webp",
//       upsert: true,
//     });

//   if (error) {
//     throw new Error(`Error al guardar avatar: ${error.message}`);
//   }

//   // Devolver URL relativa en bucket
//   return `default/${seed}.webp`;
// }
