import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

interface dataNotification {
  user_id: string;
  actor_id?: string;
  type: string;
  entity_id?: string;
  entity_type?: string;
  content: string;
  url?: string;
  read: boolean;
}

 export async function createNotification({
  user_id,
  actor_id,
  type,
  entity_id,
  entity_type,
  content,
  url,
  read,
}: dataNotification) {
  const supabase = await supabaseServerClient();
  const notificationData = {
    user_id,
    actor_id,
    type,
    entity_id,
    entity_type,
    content,
    url,
    read,
  };
  const { data, error } = await supabase
    .from("notifications")
    .insert([notificationData])
    .select()
    .single();

  if (error) {
    console.error("Error creating notification:", error);
    throw new Error("Error creating notification", {cause: error.cause})
  }

  console.log("✅ Created notification success")
  return data;
}
