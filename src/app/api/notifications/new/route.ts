import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function POST(request: Request) {
  try {
    const { user_id, message } = await request.json();

    if (!user_id || !message) {
      return NextResponse.json(
        { error: "user_id and message are required" },
        { status: 400 }
      );
    }

    const data = await createNotification({ user_id, message });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}

export const createNotification = async (notificationData: {
  user_id: string;
  message: string;
}) => {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase
    .from("notifications")
    .insert([notificationData]);

  if (error) {
    console.error("Error creating notification:", error);
    return null;
  }

  return data;
};
