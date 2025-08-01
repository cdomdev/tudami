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
    const url = `/api/view-profile/info?id=${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Error al obtener perfil",
      };
    }

    // Obtener las preferencias del usuario (puede ser array u objeto)
    const preferencesRaw = data.user_profile_preferences;
    const preferences = Array.isArray(preferencesRaw)
      ? preferencesRaw[0]
      : preferencesRaw;

    if (!preferences || !preferences.profile_public) {
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
      user_reputation: {
        id: data.user_reputation?.id,
        score: data.user_reputation?.score,
      },
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
