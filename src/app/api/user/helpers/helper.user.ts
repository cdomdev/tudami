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

  return data;
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

/**
 *
 *  proceder con la validaciones y actualizacion de datos del usurario en las diferentes talblas antes de proceder con la elimacion
 *
 */
interface UpserData {
  full_name: string;
  email: string;
  phone: number;
  deparment: string;
  city: string;
}
export async function deleteAccountHelper(
  supabase: SupabaseClient,
  user_id: string
) {
  // validar si exite el usuario y proceder a modicar datos por informacion anonima

  const user = await getDataUser(user_id, supabase);

  if (!user)
    throw new Error("No se encuentra informacion relacionada al usuario");

  let uuid = self.crypto.randomUUID();

  const dataUpserUser = {
    full_name: `Anonimo-${uuid}`,
    email: `email-anom-${uuid}@anonimo.com`,
    phone: parseFloat(uuid),
    deparment: "Anonimo",
    city: "Anonimo",
  };

  const { error } = await upserDataUser(supabase, user_id, dataUpserUser);

  if (error) {
    console.error(
      "Error en el proceso de actulizacion de datos del usuario",
      error
    );
    throw new Error("Error en el proceso de actulizacion de datos del usuario");
  }

  // validar datos en tabla de news_latter subcription
}

async function upserDataUser(
  supabase: SupabaseClient,
  user_id: string,
  dataUpserUser: UpserData
) {
  return await supabase.from("users").upsert(dataUpserUser).eq("id", user_id);
}
