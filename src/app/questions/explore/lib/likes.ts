import { createNotification } from "@/lib/notifications";
import { supabase } from "@/utils/supabase/supabaseClient";
import nPayload from "@/content/notitications/notications-entity.json";

export async function toggleLike(questionId: number, user_id: string) {
  try {
    const urlRequest = `/api/questions/explore/emit-like?question_id=${questionId}&user_id=${user_id}`;

    const res = await fetch(urlRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to toggle like", { cause: res.status });
    }
    const data = await res.json();
    return { liked: data.liked, error: null };
  } catch (error) {
    console.error("Error al emitir like:", error);
    return { liked: false, error };
  }
}

export const checkIfLiked = async (questionId: number, user_id: string) => {
  const { data: existingLike } = await supabase
    .from("question_likes")
    .select("id")
    .eq("question_id", questionId)
    .eq("user_id", user_id)
    .maybeSingle();

  return !!existingLike;
};

export async function emitLike({
  question_id,
  user_id,
  full_name,
  approval_token,
}: {
  question_id: number;
  user_id: string;
  full_name: string;
  approval_token?: string;
}) {
  const { data: questionData } = await supabase
    .from("questions")
    .select("user_id")
    .eq("id", question_id)
    .single();

  const questionOwnerId = questionData?.user_id;

  if (questionOwnerId && questionOwnerId !== user_id) {
    await createNotification({
      user_id: questionOwnerId,
      actor_id: user_id,
      type: nPayload[0].type,
      entity_id: question_id.toString(),
      entity_type: nPayload[0].entity_type,
      content: `${full_name || "A alguien"} le gustó tu publicación`,
      url: `/questions/explore/questions?query=redirect&redirect_id_question=${question_id}&aprovel=${approval_token}`,
      read: false,
    });
  }
}

// response functions

export async function checkLikeResponse(
  response_id: number,
  user_id: string | undefined
) {
  const { data } = await supabase
    .from("questions_response_likes")
    .select("*")
    .eq("response_id", response_id)
    .eq("user_id", user_id)
    .maybeSingle();
  return !!data;
}

export async function getLikesCountResponse(response_id: number) {
  const { error, count } = await supabase
    .from("questions_response_likes")
    .select("*", { count: "exact", head: true })
    .eq("response_id", response_id);
  if (error) {
    console.error("Error al obtener conteo de likes:", error.message);
    return 0;
  }
  return count;
}

export async function emitLikeResponse(
  response_id: number,
  user_id: string
) {
  const { count, error } = await supabase
    .from("questions_response_likes")
    .insert([{ response_id: response_id, user_id }])
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error al emitir like:", error.message);
    return { success: false, error };
  }
  return { success: true, count };
}

export async function removeLikeResponse(
  response_id: number,
  user_id?: string
) {
  const { count, error } = await supabase
    .from("questions_response_likes")
    .delete()
    .eq("response_id", response_id)
    .eq("user_id", user_id)
    .select()
    .maybeSingle();
  if (error) {
    console.error("Error al eliminar like:", error.message);
    return { success: false, error };
  }

  return { success: true, count };
}
