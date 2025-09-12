// import { User } from "@/schemas/schema.user";
import { SupabaseClient } from "@supabase/supabase-js";

// export interface UserPreferences {
//   user_id: string;
//   full_name: string;
//   profile_public?: boolean;
//   allow_email?: boolean;
//   allow_whatsapp?: boolean;
//   phone?: number;
//   bio?: string;
//   city?: string;
//   roles: {
//     rol_name: string;
//   };
//   department?: string;
// }

// funcion para obtener y noramlizar datos del usuario

/**
 * Solicitud base con narmalizacion
 * @param userId 
 * @param client 
 * @returns 
 */
// export async function getDataUser(userId: string, client: SupabaseClient) {
//   if (!userId) {
//     throw new Error("ID de usuario requerido para obtener perfil");
//   }

//   const { data, error } = await client
//     .from("users")
//     .select(
//       `
//       id,
//       full_name,
//       avatar_url,
//       email,
//       phone,
//       bio,
//       country,
//       city,
//       department,
//       created_at,
//       user_profile_preferences (
//       profile_public,
//         allow_email,
//         allow_whatsapp
//         ),
//         questions(count),
//       question_comments(count),
//       user_reputation (
//       id,
//         score
//         ),
//         user_achievements(
//         id,
//         achievement_id
//       )
//       , roles(rol_name) 
//       `
//     )
//     .eq("id", userId)
//     .single();

//   if (error || !data) {
//     throw new Error(
//       `Error obteniendo perfil: ${error?.message || "No se encontró el perfil"}`
//     );
//   }


//   //Normalizar

//   const normalizedPreferences =
//     typeof data.user_profile_preferences === "object" &&
//     !Array.isArray(data.user_profile_preferences)
//       ? data.user_profile_preferences
//       : {
//           profile_public: true,
//           allow_email: false,
//           allow_whatsapp: false,
//         };

//   // Normalizar user_reputation
//   const reputationArray = data.user_reputation;
//   const normalizedReputation =
//     Array.isArray(reputationArray) && reputationArray.length > 0
//       ? reputationArray[0]
//       : {
//           id: 0,
//           score: 0,
//         };
//   // Normalizar preguntas y respuestas
//   const questionsCount = Array.isArray(data.questions)
//     ? data.questions[0]?.count ?? 0
//     : 0;
//   const commentsCount = Array.isArray(data.question_comments)
//     ? data.question_comments[0]?.count ?? 0
//     : 0;

//   // Mapear rol

//   return {
//     ...data,
//     user_profile_preferences: normalizedPreferences,
//     user_reputation: normalizedReputation,
//     questions: questionsCount,
//     question_comments: commentsCount,
//   };
// }


/**
 * Solicitud a vista con normalizacion desde supabase
 * @param userId 
 * @param client 
 * @returns 
 */
export async function getDataUser(userId: string, client: SupabaseClient) {
  const { data, error } = await client
    .from("v_user_context")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) {
    throw new Error(
      `Error obteniendo perfil: ${error?.message || "No se encontró el perfil"}`
    );
  }

  return data
}


// obtener listado de aplicaio a una oferta

export async function getListApplicationsHelper(
  offerId: string,
  supabase: SupabaseClient
) {
  return await supabase
    .from("v_offers_applicants")
    .select("*")
    .eq("offer_id", offerId);
}

/**
 * Obtiene las ofertas guardadas por el usuario
 *
 */

export async function getSavedOffersHelper(supabase: SupabaseClient) {
  return await supabase.from("v_offers_saveds").select("*");
}

// obtener las preguntas guardadas de un usuario

export async function getSavedQuestionsHelper(supabase: SupabaseClient) {
  return await supabase.from("v_questions_saveds").select("*");
}

/**
 * Obtiene las preferencias del usuario desde la base de datos
 */
export async function getUserPreferencesHelper(
  userId: string,
  supabase: SupabaseClient
) {
  return await supabase
    .from("user_profile_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();
}

/**
 * Obtenere las ofertas de un usuario
 * @param userId
 * @param supabase
 * @returns
 */

export async function getOffersHelper(
  userId: string,
  supabase: SupabaseClient
) {
  return await supabase
    .from("offers")
    .select(`*, users(id, full_name, avatar_url)`)
    .eq("user_id", userId);
}
