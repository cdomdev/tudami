import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const supabase = await supabaseServerClient();

  try {
    const offers = await getOffers(page, pageSize, supabase);
    return NextResponse.json(offers);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching data offers" },
      { status: 500 }
    );
  }
}

export async function getOffers(
  page = 1,
  pageSize = 10,
  supabase: SupabaseClient
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const query = supabase
    .from("view_all_offers")
    .select(`*`)
    .range(from, to)
    .order("created_at", { ascending: false });
  const { data, error } = await query;

  if (error) {
    console.error("Error on funtion helper getOffers:", error);
    throw new Error(error.message);
  }

  return data ?? [];
}
