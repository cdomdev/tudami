import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { getQuestionsBySlug } from "../helpers/index";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const pageStr = searchParams.get("page") || "1";
  const pageSizeStr = searchParams.get("pageSize") || "10";
  const search = searchParams.get("search") || "";

  const supabase = await supabaseServerClient();

  if (!slug) {
    return NextResponse.json(
      { error: "Missing question SLUG" },
      { status: 400 }
    );
  }
  const page = parseInt(pageStr, 10);
  const pageSize = parseInt(pageSizeStr, 10);
  if (isNaN(page) || isNaN(pageSize)) {
    return NextResponse.json(
      { error: "Invalid page or pageSize format" },
      { status: 400 }
    );
  }
  try {
    const question = await getQuestionsBySlug(
      supabase,
      page,
      pageSize,
      search,
      slug
    );
    return NextResponse.json(question);
  } catch (error) {
    NextResponse.json(error);
  }
}
