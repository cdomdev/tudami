import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function PUT(request: NextRequest) {
  try {
    const urlParams = new URL(request.url).searchParams;
    const id = urlParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "id is required" },
        { status: 400 }
      );
    }

    const { error } = await updateNotificationAsRead(Number(id));

    if (error) {
      return NextResponse.json(
        { error: "Error marking notification as read" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Notification marked as read" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}

export const updateNotificationAsRead = async (id: number) => {
  const supabase = await supabaseServerClient();
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", id);

  return { error };
};
