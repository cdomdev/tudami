import { supabase } from "@/utils/supabase/supabaseClient";

export interface UserPreferences {
  user_id: string;
  full_name: string;
  profile_public?: boolean;
  allow_email?: boolean;
  allow_whatsapp?: boolean;
  phone?: number;
  bio?: string;
  city?: string;
  department?: string;
  avatar_url?: string;
}

// subir imagen

export async function uploadImage(file: File, userId: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userId", userId);

  try {
    const res = await fetch("/api/user/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("Error en API upload:", data);
      throw new Error(
        data?.error || `Error al subir la nueva imagen de perfil`
      );
    }

    return data;
  } catch (error) {
    console.error("Error en uploadImage:", error);
    return null;
  }
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
        full_name: preferences.full_name,
        phone: preferences.phone,
        bio: preferences.bio,
        city: preferences.city,
        department: preferences.department,
        avatar_url: preferences.avatar_url,
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
    return await supabase
      .from("user_profile_preferences")
      .update(preferences)
      .eq("user_id", userId)
      .select()
      .single();
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
    const data = await fetch(`/api/user/get-preferences?user_id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataJson = await data.json();

    return dataJson.data ?? [];
  } catch (error) {
    console.error("Error en getUserPreferences:", error);
    return { data: null, error };
  }
}

/**
 * Obtiene las preguntas guardadas por el usuario
 *
 */

// ✅
export async function getSavedQuestions() {
  try {
    const url = `/api/user/get-save-questions`;
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataJson = await data.json();

    return dataJson.data ?? [];
  } catch (error) {
    console.error("Error en getSavedQuestions:", error);
    return [];
  }
}

/**
 * Obtiene las ofertas guardadas por el usuario
 *
 */

// ✅

export async function getSavedOffers() {
  try {
    const url = `/api/user/get-offers-saved`;
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataJson = await data.json();

    return dataJson.data ?? [];
  } catch (error) {
    console.error("Error en getSavedOffers:", error);
    return [];
  }
}

// ✅
/**
 * obtener listado de aplicacaiones a ofertas
 * @param offerId
 * @returns
 */
export async function getListApplications(offerId: string) {
  if (!offerId) {
    console.error("No offer ID provided");
    return [];
  }
  try {
    const url = `/api/user/get-offer-application?offer_id=${offerId}`;
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataJson = await data.json();

    return dataJson.data ?? [];
  } catch (error) {
    console.error("Error en getListApplications:", error);
    return [];
  }
}

// obtener el listado de ofertas publicadas por un usuario

export async function getOffersByUser(userId: string) {
  try {
    const url = `/api/user/get-offers?user_id=${userId}`;
    const data = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataJson = await data.json();

    return dataJson.data ?? [];
  } catch (error) {
    console.error("Error en getOffersByUser:", error);
    return [];
  }
}
