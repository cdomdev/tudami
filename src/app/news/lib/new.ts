import { supabase } from "@/utils/supabase/supabaseClient";

export async function validateSubscribe(email: string) {
  try {
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .eq("email", email)
      .single();

    if (!data || error) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Error en la validacion de subcripcion", error);
  }
}


export async function desSubscribe(email: string) {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("email", email);

  if (error) {
    console.error("Error al eliminar suscriptor:", error.message);
    return { success: false, error };
  }

  return { success: true, data };
}

