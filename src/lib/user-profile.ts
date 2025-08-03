import { SupabaseClient } from "@supabase/supabase-js";
import { UserSchema } from "@/schemas"

/**
 * Interfaz para las preferencias del perfil de usuario
 */
interface UserProfilePreference {
  profile_public?: boolean;
  allow_email?: boolean;
  allow_whatsapp?: boolean;
}

/**
 * Interfaz para los conteos de preguntas y comentarios
 */
interface CountResult {
  count: number;
}

/**
 * Interfaz para los logros del usuario
 */
interface UserAchievement {
  id?: string | null;
  achievement_id: string | null;
}

/**
 * Interfaz para la reputación del usuario
 */
interface UserReputation {
  questions: number;
  responses: number;
  score: string | number;
}

/**
 * Interfaz para el perfil completo del usuario de Supabase
 */
export interface UserProfileData {
  // Campos básicos del usuario
  id?: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  provider?: string;

  // Campos del perfil
  phone?: string;
  bio?: string;
  city?: string;
  department?: string;
  country?: string;
  approval_token?: string;
  created_at: Date;

  // Relaciones
  user_profile_preferences?: UserProfilePreference[];
  questions?: CountResult[];
  question_comments?: CountResult[];
  user_achievements?: UserAchievement[];
  user_reputation?: UserReputation[];

  // Propiedades adicionales (menos permisivo que 'any')
  [key: string]: unknown;
}

/**
 * Consulta el perfil del usuario con todas sus relaciones
 * @param userId ID del usuario a consultar
 * @param client Cliente de Supabase para realizar la consulta
 * @returns Datos del perfil del usuario con todas sus relaciones
 */
export async function getUserProfile(
  userId: string,
  client: SupabaseClient
) {
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


  return data;
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
  userProfile: UserProfileData;
}): UserSchema {
  return {
    id,
    email: email || "",
    full_name,
    avatar_url,
    provider,
    phone: userProfile.phone || "",
    bio: userProfile.bio || "",
    city: userProfile?.city || "",
    department: userProfile?.department || "",
    country: userProfile?.country || "Colombia",
    approval_token: userProfile?.approval_token || "",
    created_at: userProfile.created_at,
    user_profile_preferences: {
      profile_public: userProfile?.user_profile_preferences?.[0]?.profile_public ?? true,
      allow_email: userProfile?.user_profile_preferences?.[0]?.allow_email ?? false,
      allow_whatsapp: userProfile?.user_profile_preferences?.[0]?.allow_whatsapp ?? false,
    },
    user_reputation: {
      questions: userProfile.questions?.[0]?.count ?? 0,
      responses: userProfile.question_comments?.[0]?.count ?? 0,
      score: userProfile.user_reputation?.[0]?.score?.toString() ?? "0",

    },
    user_achievements: {
      id: userProfile.user_achievements?.[0].id || "",
      achievement_id: userProfile.user_achievements?.[0]?.achievement_id || "",
    }
  };
}
