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

export async function getNews() {
  const { data, error } = await supabase.from("news").select("*");

  if (error) {
    console.error("Error al obtener noticias:", error.message);
    return { success: false, error, data: [] };
  }

  return { success: true, data };
}

export async function checkLike(new_id: number, user_id: string | undefined) {
  const { data } = await supabase
    .from("news_likes")
    .select("*")
    .eq("new_id", new_id)
    .eq("user_id", user_id)
    .maybeSingle();
  return !!data;
}

export async function getLikesCount(new_id: number) {
  const { error, count } = await supabase
    .from("news_likes")
    .select("*", { count: "exact", head: true })
    .eq("new_id", new_id);
  if (error) {
    console.error("Error al obtener conteo de likes:", error.message);
    return 0;
  }
  return count;
}

export async function emitLike(new_id: number, user_id?: string) {
  const { count, error } = await supabase
    .from("news_likes")
    .insert([{ new_id, user_id }])
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error al emitir like:", error.message);
    return { success: false, error };
  }
  

  return { success: true, count };
}

export async function removeLike(new_id: number, user_id?: string) {
  const { count, error } = await supabase
    .from("news_likes")
    .delete()
    .eq("new_id", new_id)
    .eq("user_id", user_id)
    .select()
    .maybeSingle();
  if (error) {
    console.error("Error al eliminar like:", error.message);
    return { success: false, error };
  }


  return { success: true, count };
}