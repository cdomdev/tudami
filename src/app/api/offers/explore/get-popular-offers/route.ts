import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const supabase = await supabaseServerClient();
  const user_id = searchParams.get("user_id") || "";

  try {
    const offers = await getUnansweredOffers(page, pageSize, supabase, user_id);
    return NextResponse.json(offers);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching data offers" },
      { status: 500 }
    );
  }
}

async function getUnansweredOffers(
  page: number,
  pageSize: number,
  supabase: SupabaseClient,
  user_id: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error } = await supabase
    .from("offers")
    .select(
      `*, 
     users:user_id (
       id,
       full_name,
       avatar_url,
       email,
       phone,
       bio,
       country,
       city,
       department,
       created_at
     ),
     offers_applications(count)`
    )
    .eq("user_id", user_id)
    .is("offers_applications", null) 
    .range(from, to)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching my offers:", error);
    throw new Error(error.message);
  }

  return data;
}


// vista para las ofertas populares

// create view offers_with_applications_gt_10 as
// select o.*,
//        count(oa.id) as applications_count
// from offers o
// left join offers_applications oa
//   on oa.offer_id = o.id
// group by o.id
// having count(oa.id) > 10;
