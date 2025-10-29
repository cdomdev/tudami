import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { NextRequest, NextResponse } from "next/server";
import { getUnansweredQuestionsApi } from "../helpers/index";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const search = searchParams.get("search") || undefined;
  const supabase = await supabaseServerClient();
  try {
    const questions = await getUnansweredQuestionsApi(
      supabase,
      page,
      pageSize,
      search
    );
    return NextResponse.json(questions);
  } catch (error) {
    NextResponse.json(error);
  }
}
