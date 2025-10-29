import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { getQuestionsByTag } from "../helpers/index";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("slug") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const search = searchParams.get("search") || "";

  const supabase = await supabaseServerClient();

  try {
    const questions = await getQuestionsByTag(
      supabase,
      tag,
      page,
      pageSize,
      search,
    );

    return NextResponse.json(questions);
  } catch (error) {
    NextResponse.json(error);
  }
}
