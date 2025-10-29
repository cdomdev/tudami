import { SupabaseClient } from "@supabase/supabase-js";

export async function fetchGeneralQuestions(
  supabase: SupabaseClient,
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("view_all_questions")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("Error en home:", error);
    throw new Error(error.message);
  }

  return { questions: data ?? [], total: count ?? 0 };
}

export async function getQuestionsBySlug(
  supabase: SupabaseClient,
  page = 1,
  pageSize = 10,
  search?: string,
  slug?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  let query = supabase
    .from("view_all_questions")
    .select(`*`)
    .range(from, to)
    .eq("slug", slug?.trim());

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas del usuario:", error);
    return [];
  }
  return data || [];
}

/**
 *
 * @param tagSlug
 * @param page
 * @param pageSize
 * @param search
 * @returns
 */

export async function getQuestionsByTag(
  supabase: SupabaseClient,
  tagSlug: string,
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // Obtener el ID del tag por el slug
  const { data: tagData, error: tagError } = await supabase
    .from("tags")
    .select("id")
    .eq("slug", tagSlug)
    .single();

  if (tagError || !tagData) {
    console.error("Error al obtener el tag:", tagError);
    return [];
  }

  let query = supabase
    .from("view_all_questions")
    .select("*")
    .contains("tag_ids", [tagData.id])
    .range(from, to);

  // Filtro adicional por búsqueda (en título o contenido)
  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas por tag:", error);
    return [];
  }

  const sorted = (data ?? []).sort(
    (a, b) => (b.question_likes?.length ?? 0) - (a.question_likes?.length ?? 0)
  );

  return sorted;
}

/**
 *
 * @param page
 * @param pageSize
 * @param search
 * @returns
 */

export async function getPopularQuestions(
  supabase: SupabaseClient,
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("view_popular_questions")
    .select(`*`)
    .range(from, to);

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas populares:", error);
    return [];
  }

  const dataLength = data?.length > 0 ? data : [];

  return dataLength;
}

/**
 *
 * @param page
 * @param pageSize
 * @param search
 * @returns
 */

export async function getMyQuestionsApi(
  supabase: SupabaseClient,
  page = 1,
  pageSize = 10,
  search?: string
) {
  const user = (await supabase.auth.getUser()).data?.user;
  if (!user) return [];

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("view_all_questions")
    .select("*")
    .range(from, to)
    .eq("user_id", user.id);

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas del usuario:", error);
    return [];
  }

  return data ?? [];
}

/**
 *
 * @param page
 * @param pageSize
 * @param search
 * @returns
 */

export async function getUnansweredQuestionsApi(
  supabase: SupabaseClient,
  page = 1,
  pageSize = 10,
  search?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("view_unanswered_questions")
    .select("*")
    .range(from, to);

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error al obtener preguntas sin responder:", error);
    return [];
  }

  return data ?? [];
}


//likes 
/**
 * 
 * @param questionId 
 * @param user_id 
 * @param supabase 
 * @returns 
 */

export async function toggleLike(
  questionId: number,
  user_id: string,
  supabase: SupabaseClient
) {
  try {
    const { data: existingLike, error: selectError } = await supabase
      .from("question_likes")
      .select("id")
      .eq("question_id", questionId)
      .eq("user_id", user_id)
      .maybeSingle();

    if (selectError) {
      return { liked: false, error: selectError };
    }

    if (existingLike) {
      const { error: deleteError } = await supabase
        .from("question_likes")
        .delete()
        .eq("question_id", questionId)
        .eq("user_id", user_id);

      if (deleteError) {
        throw new Error(`Error en el proceso:`, deleteError);
      }

      return { liked: false, error: deleteError };
    } else {
      const { error: insertError } = await supabase
        .from("question_likes")
        .insert({
          question_id: questionId,
          user_id,
        });

      if (insertError) {
        throw new Error(`Error en el proceso:`, insertError);
      }

      return { liked: true, error: insertError };
    }
  } catch (error) {
    console.error(`[toggleLike] Error inesperado:`, error);
    return { liked: false, error };
  }
}
