import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { SupabaseClient } from "@supabase/supabase-js";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("id");
  const approval = url.searchParams.get("u_view_profile_p");

  const supabase = await supabaseServerClient();
  try {
    if (!userId || approval === null) {
      return NextResponse.json(
        { error: "User ID and approval are required" },
        { status: 400 }
      );
    }
    const data = await dataComment(supabase, userId);

    if (!data) {
      return NextResponse.json(
        { error: "Error en helper que obtiene datos" },
        { status: 404 }
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

async function dataComment(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase
    .from("question_comments")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    throw new Error("Error feching data for questions comennts");
  }

  return data;
}
