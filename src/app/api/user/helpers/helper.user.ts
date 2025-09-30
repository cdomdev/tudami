import { SupabaseClient } from "@supabase/supabase-js";


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
