import { SupabaseClient } from "@supabase/supabase-js";
import { supabaseAdm } from "@/utils/supabase/supabaseAdm";
import { cookies } from "next/dist/server/request/cookies";
import { resend } from "@/emails/congif";
import { ByeTemplate} from "@/emails/ByeTemplate";

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

export async function deleteAccountHelper(
  supabase: SupabaseClient,
  user_id: string
) {
  // validar si exite el usuario y proceder a modicar datos por informacion anonima

  const user = await getDataUser(user_id, supabase);
  const name = user?.full_name || "Anonimo";
  const email = user?.email;

  if (!user)
    throw new Error("No se encuentra informacion relacionada al usuario");

  const { error } = await upserDataUser(supabase, user_id);

  if (error) {
    console.error(
      "Error en el proceso de actulizacion de datos del usuario",
      error
    );
    throw new Error("Error en el proceso de actulizacion de datos del usuario");
  }


  // enviar correo de despedida

  await farewellEmail(email, name);
}

async function upserDataUser(supabase: SupabaseClient, user_id: string) {
  const uuid = crypto.randomUUID();

  // actulizar preferencias del usuario a valores por defecto
  await resetUserPreferences(supabase, user_id);

  const dataUpserUser = {
    full_name: `Anonimo-${uuid.slice(0, 8)}`,
    email: `anom-${uuid.slice(0, 2)}@anonimo.com`,
    phone: parseFloat(uuid.slice(0, 7).replace(/[^\d]/g, "")) || 0,
    department: "Anonimo",
    city: "Anonimo",
    bio: "Usuario eliminado",
  };

  const { error } = await supabase
    .from("users")
    .upsert(dataUpserUser)
    .eq("id", user_id);

  if (error) {
    console.error("Error al actualizar datos del usuario:", error);
    throw new Error("Error al actualizar datos del usuario");
  }

  return { error: null };
}

async function resetUserPreferences(supabase: SupabaseClient, user_id: string) {
  const { error } = await supabase
    .from("user_profile_preferences")
    .delete()
    .eq("user_id", user_id);

  if (error) {
    console.error("Error al restablecer preferencias:", error);
    throw new Error("Error al restablecer preferencias");
  }

  await deleteNotifications(supabase, user_id);
  await deleteUserDataNewsletter(supabase, user_id);
  await deleteUserByAdmin(user_id);
  return { error: null };
}

async function deleteUserDataNewsletter(
  supabase: SupabaseClient,
  user_id: string
) {
  // validar si el usuario esta subcrito

  const { data } = await supabase
    .from("news_letter_subscriptions")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (data) {
    // El usuario está suscrito, proceder a eliminar la suscripción
    const { error } = await supabase
      .from("news_letter_subscriptions")
      .delete()
      .eq("user_id", user_id);
    if (error) {
      console.error("Error al eliminar datos de la newsletter:", error);
      throw new Error("Error al eliminar datos de la newsletter");
    }
  }

  await clearUserSession();

  return { error: null };
}

async function deleteUserByAdmin(user_id: string) {
  const { error } = await supabaseAdm.auth.admin.deleteUser(user_id);

  if (error) {
    console.error("Error al eliminar usuario por admin:", error);
    throw new Error("Error al eliminar usuario por admin");
  }

  return { error: null };
}

// limpiar sesion y cookies del usuario
async function clearUserSession() {
  const cookieStore = await cookies();

  const cookiesToClear = [
    "sb-access-token",
    "approval_token",
    "sb-refresh-token",
  ];

  cookiesToClear.forEach((cookieName) => {
    cookieStore.delete(cookieName);
  });

  await supabaseAdm.auth.signOut();

  return {
    success: true,
    message: "Su perfil ha sido eliminado y la sesión cerrada.",
  };
}

async function deleteNotifications(supabase: SupabaseClient, user_id: string) {
  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("user_id", user_id);

  if (error) {
    console.error("Error al eliminar notificaciones:", error);
    throw new Error("Error al eliminar notificaciones");
  }
  return { error: null };
}



export async function farewellEmail(to: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Tudami <team@info.tudami.com>",
      to: to,
      subject: "Hasta pronto 👋",
      react: ByeTemplate({ name: name }),
    });

    if (error) {
      console.error("Error enviando correo:", error);
      return Response.json({ error }, { status: 500 });
    }

    console.log("Correo enviado:", data);
    return Response.json({ success: true, data });
  } catch (err) {
    console.error("Fallo inesperado al enviar:", err);
    return Response.json({ error: "Error interno de envío" }, { status: 500 });
  }
}