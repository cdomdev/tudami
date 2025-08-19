import { supabase } from "@/utils/supabase/supabaseClient";

export interface UserPreferences {
  user_id: string;
  profile_public?: boolean;
  allow_email?: boolean;
  allow_whatsapp?: boolean;
  phone?: number;
  bio?: string;
  city?: string;
  department?: string;
}

/**
 * Actualiza las preferencias del usuario en la base de datos
 */

export async function updateProfile(
  userId: string,
  preferences: Partial<Omit<UserPreferences, "id">>
) {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        phone: preferences.phone,
        bio: preferences.bio,
        city: preferences.city,
        department: preferences.department,
      })
      .eq("id", userId)
      .select()
      .single();
    if (error) {
      console.error("Error actualizando preferencias:", error.message);
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error en updateUserPreferences:", error);
    return { data: null, error };
  }
}

export async function updateUserPreferences(
  userId: string,
  preferences: Partial<Omit<UserPreferences, "user_id">>
) {
  try {
    const { data, error } = await supabase
      .from("user_profile_preferences")
      .update(preferences)
      .eq("user_id", userId)
      .select()
      .single();
    if (error) {
      console.error("Error actualizando preferencias:", error.message);
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error en updateUserPreferences:", error);
    return { data: null, error };
  }
}

/**
 * Obtiene las preferencias del usuario desde la base de datos
 */
export async function getUserPreferences(userId: string) {
  try {
    const { data, error } = await supabase
      .from("user_profile_preferences")
      .select("*")
      .eq("user_id", userId)
      .single();

    // PGRST116 = no rows found
    if (error && error.code !== "PGRST116") {
      console.error("Error obteniendo preferencias:", error);
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error en getUserPreferences:", error);
    return { data: null, error };
  }
}

/**
 * Obtiene las preguntas guardadas por el usuario
 *
 */

export async function getSavedQuestions() {
  try {
    const { data, error } = await supabase
      .from("v_questions_saveds")
      .select("*");

    if (error) {
      console.error("Error obteniendo preguntas guardadas:", error);
      throw error;
    }

    return data ?? [];
  } catch (error) {
    console.error("Error en getSavedQuestions:", error);
    return [];
  }
}

/**
 * Obtiene las ofertas guardadas por el usuario
 *
 */

export async function getSavedOffers() {
  try {
    const { data, error } = await supabase.from("v_offers_saveds").select("*");
    if (error) {
      console.error("Error obteniendo ofertas guardadas:", error);
      throw error;
    }

    return data ?? [];
  } catch (error) {
    console.error("Error en getSavedOffers:", error);
    return [];
  }
}

export async function getListApplications(offerId: string) {
  if (!offerId) {
    console.error("No offer ID provided");
    return [];
  }
  try {
    const { data, error } = await supabase
      .from("v_offers_applicants")
      .select("*")
      .eq("offer_id", offerId);

    if (error) {
      console.error("Error obteniendo aplicaciones:", error);
      throw error;
    }

    return data ?? [];
  } catch (error) {
    console.error("Error en getListApplications:", error);
    return [];
  }
}
