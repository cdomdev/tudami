import { supabase } from "@/utils/supabase/supabaseClient";
import nPayload from "@/content/notitications/notications-entity.json";
import { createNotification } from "@/lib/notifications";

/**
 *
 * @param question_id
 * @param questionOwnerId
 * @param user_id
 * @param full_name
 */

export async function noficationsFromComments(
  question_id: number,
  questionOwnerId: string,
  user_id: string,
  full_name: string
) {
  const { data: dataQ } = await supabase
    .from("questions")
    .select("slug")
    .eq("id", question_id)
    .single();

  const notificationPayload = {
    user_id: questionOwnerId,
    actor_id: user_id,
    type: nPayload[1].type,
    entity_type: nPayload[1].entity_type,
    content: `${full_name || "Alguien"} comentó en tu pregunta.`,
    url: `/questions/explore/q?query=redirect&slug=${dataQ?.slug}`,
    read: false,
  };

  if (questionOwnerId && questionOwnerId !== user_id) {
    await createNotification(notificationPayload);
  }
}

/**
 *
 * @param question_id
 * @param user_id
 * @param full_name
 */

export async function notificationFromLikes(
  question_id: number,
  user_id: string,
  full_name: string
) {
  const { data: questionData } = await supabase
    .from("questions")
    .select("user_id, slug")
    .eq("id", question_id)
    .single();

  const questionOwnerId = questionData?.user_id;
  const slug = questionData?.slug;

  const notificationPayload = {
    user_id: questionOwnerId,
    actor_id: user_id,
    type: nPayload[0].type,
    entity_type: nPayload[0].entity_type,
    content: `${full_name || "A alguien"} le gustó tu publicación`,
    url: `/questions/explore/q?query=redirect&slug=${slug}`,
    read: false,
  };

  if (questionOwnerId && questionOwnerId !== user_id) {
    await createNotification(notificationPayload);
  }
}

/**
 *
 * @param question_id
 * @param response_id
 * @param user_id
 * @param full_name
 */

export async function notificationFromResLikes(
  question_id: number,
  response_id: number,
  user_id: string,
  full_name?: string
) {
  const { data: dataSlug } = await supabase
    .from("questions")
    .select("slug")
    .eq("id", question_id)
    .single();

  const { data: questionResponseData } = await supabase
    .from("question_comments")
    .select("user_id")
    .eq("id", response_id)
    .single();

  const responseOwner = questionResponseData?.user_id;
  const notificationPayload = {
    user_id: responseOwner,
    actor_id: user_id,
    type: nPayload[0].type,
    entity_type: nPayload[0].entity_type,
    content: `${full_name || "A alguien"} le gustó tu respuesta`,
    url: `/questions/explore/q?query=redirect&slug=${dataSlug?.slug}`,
    read: false,
  };

  if (responseOwner && responseOwner !== user_id) {
    await createNotification(notificationPayload);
  }
}
