import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("id");
  const approval = url.searchParams.get("u_view_profile_p");

  console.log("Fetching answers for user ID:", userId, "with approval:", approval);

  const supabase = await supabaseServerClient();
  try {
    if (!userId || approval === null) {
      return NextResponse.json(
        { error: "User ID and approval are required" },
        { status: 400 }
      );
    }
    const { data, error } = await supabase
      .from("question_comments")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.error("Error fetching questions comments:", error);
      return NextResponse.json(
        { error: "Error fetching questions comments" },
        { status: 500 }
      );
    }
    console.log("Data fetched successfully: API --->", data);
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
