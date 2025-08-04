import { SupabaseClient } from "@supabase/supabase-js";
import { UserSchema } from "@/schemas";

/**
 * Consulta el perfil del usuario con todas sus relaciones
 * @param userId ID del usuario a consultar
 * @param client Cliente de Supabase para realizar la consulta
 * @returns Datos del perfil del usuario con todas sus relaciones
 */
export async function getUserProfile(userId: string, client: SupabaseClient) {
  if (!userId) {
    throw new Error("ID de usuario requerido para obtener perfil");
  }

  const { data, error } = await client
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
      question_comments(count),
      user_reputation (
        id,
        score
      ),
      user_achievements(
        id,
        achievement_id
      ) 
    `
    )
    .eq("id", userId)
    .single();

  if (error || !data) {
    throw new Error(
      `Error obteniendo perfil: ${error?.message || "No se encontró el perfil"}`
    );

  }

  return data ;
}

/**
 * Construye el objeto de usuario para el contexto del cliente
 * Esta función es síncrona y simplemente transforma los datos del perfil
 * al formato UserSchema para ser usado en el contexto de la aplicación
 *
 * @param params Parámetros necesarios para construir el objeto de usuario
 * @returns Objeto de usuario con formato UserSchema para el contexto de la aplicación
 */
export function buildUserContextObject({
  id,
  email,
  full_name,
  avatar_url,
  provider,
  userProfile,
}: {
  id: string;
  email: string | undefined;
  full_name: string;
  avatar_url: string;
  provider: string;
  userProfile: UserSchema;
}) {
  return {
    provider,
    id,
    email: email || "",
    full_name,
    avatar_url,
    phone: userProfile.phone || "",
    bio: userProfile.bio || "",
    city: userProfile?.city || "",
    department: userProfile?.department || "",
    country: userProfile?.country || "Colombia",
    created_at: userProfile.created_at,
    user_profile_preferences: {
      profile_public:
        userProfile?.user_profile_preferences.profile_public ?? false,
      allow_email: userProfile?.user_profile_preferences?.allow_email ?? false,
      allow_whatsapp:
        userProfile?.user_profile_preferences?.allow_whatsapp ?? false,
    },
    questions: userProfile?.questions ?? 0,
    question_comments: userProfile?.question_comments ?? 0,
    user_reputation: {
      score: userProfile.user_reputation[0]?.score || 0,
    },
    user_achievements:
      userProfile.user_achievements?.map((achievement) => ({
        id: achievement.id || "",
        achievement_id: achievement.achievement_id || "",
      })) || [],
  };
}
