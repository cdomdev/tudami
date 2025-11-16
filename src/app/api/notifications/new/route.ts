import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

interface dataNotification {
  user_id: string;
  actor_id: string;
  type: string;
  entity_id: string;
  entity_type: string;
  content: string;
  url?: string;
  read: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const {
      user_id,
      actor_id,
      type,
      entity_id,
      entity_type,
      content,
      url,
      read,
    } = await request.json();

    if (!user_id || !content) {
      return NextResponse.json(
        { error: "user_id and message are required" },
        { status: 400 }
      );
    }

    const payloadData = {
      user_id,
      actor_id,
      type,
      entity_id,
      entity_type,
      content,
      url,
      read,
    };


    const data = await createNotification(payloadData);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}

 async function createNotification({
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
    throw new Error("Error creating notification", {cause: error})
  }

  console.log("✅ Created notification success")
  return data;
}
