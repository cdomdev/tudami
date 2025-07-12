import { supabase } from "@/lib/supabase";
import { SchemaProfileResponse } from "../schema/schemaResponse";

type ProfileResponse = {
  data?: SchemaProfileResponse;
  success: boolean;
  message?: string;
};

export async function getDataProfilePublic({
  userId,
}: {
  userId: string;
}): Promise<ProfileResponse> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select(
        `
        id,
        full_name,
        avatar_url,
        email,
        phone,
        bio,
        country,
        city,
        department,
        created_at,
        user_profile_preferences (
          profile_public,
          allow_email,
          allow_whatsapp
        ),
        questions(count),
        question_comments(count)
      `
      )
      .eq("id", userId)
      .single();

    if (error || !data) {
      return { success: false, message: "Usuario no encontrado" };
    }


    // Obtener las preferencias del usuario (puede ser array u objeto)
    const preferencesRaw = data.user_profile_preferences;
    const preferences = Array.isArray(preferencesRaw) ? preferencesRaw[0] : preferencesRaw;
    
    
    if (!preferences || !preferences.profile_public) {
      console.log("Perfil no público o preferencias no encontradas");
      return { success: false, message: "Este perfil no es público" };
    }

    const profileData: SchemaProfileResponse = {
      id: data.id,
      full_name: data.full_name,
      avatar_url: data.avatar_url,
      bio: data.bio,
      country: data.country,
      city: data.city,
      department: data.department,
      created_at: data.created_at,
      user_profile_preferences: preferences,
      questions: data.questions || [],
      question_comments: data.question_comments || [],
      email: preferences.allow_email ? data.email : undefined,
      phone: preferences.allow_whatsapp ? String(data.phone) : undefined,
    };

    return { data: profileData, success: true };
  } catch (error) {
    console.error("Error obteniendo perfil público:", error);
    return { success: false, message: "Error interno del servidor" };
  }
}

/**
 * Valida el token de aprobación.
 */
export async function validateTokenApproval(token: string): Promise<boolean> {
  const tokenResponse = await fetch("/api/validate-token-aprov", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
  return tokenResponse.ok;
}
