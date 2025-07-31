import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("u_view_profile_p");
  const approval = searchParams.get("aprov");
  const supabase = await supabaseServerClient();
  try {
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const { data, error } = await supabase
      .from(`questions_comments, users:questions_comments.user_id=users.id`)
      .select("*")
      .eq("user_id", userId)
      .eq("approved", approval);

    if (error) {
      console.error("Error fetching questions comments:", error);
      return NextResponse.json(
        { error: "Error fetching questions comments" },
        { status: 500 }
      );
    }
    return NextResponse.json({
      success: true,
      data: data || [],
    });
  } catch (error) {
    console.error("Error al obtener respuestas:", error);
    return NextResponse.json(
      { error: "Error al obtener respuestas" },
      { status: 500 }
    );
  }
}
