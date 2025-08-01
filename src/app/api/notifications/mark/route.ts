import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function POST(request: Request) {
  try {
    const urlParams = new URL(request.url).searchParams;
    const notificationId = urlParams.get("notificationId");

    if (!notificationId) {
      return NextResponse.json(
        { error: "notificationId is required" },
        { status: 400 }
      );
    }

    const data = await markNotificationAsRead(notificationId);

    if (!data) {
      return NextResponse.json(
        { error: "Error marking notification as read" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: "Notificacion marcada como leída" }, { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}

export const markNotificationAsRead = async (notificationId: string) => {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId);

  if (error) {
    console.error("Error marking notification as read:", error);
    return null;
  }

  return data;
};


