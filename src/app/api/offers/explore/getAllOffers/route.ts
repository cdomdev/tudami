import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
    const supabase = await supabaseServerClient();

    try {
        const offers = await getOffers(page, pageSize, supabase)
        return NextResponse.json(offers);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Error fetching data offers" }, { status: 500 });
    }
}


export async function getOffers(
    page = 1,
    pageSize = 10,
    supabase: SupabaseClient
) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
        .from("offers")
        .select(`*, users:user_id (
        id,
        full_name,
        avatar_url,
        email,
        phone,
        bio,
        country,
        city,
        department,
        created_at),
        offers_applications(count)`)
        .range(from, to);
    const { data, count, error } = await query;

    // normalizacion para el contador    
    const offers = data?.map((offer) => ({
        ...offer,
        offers_applications: offer.offers_applications[0].count,
    }));

    if (error) {
        console.error("Error on funtion helper getOffers:", error);
        throw new Error(error.message);
    }

    return { offers: offers ?? [], count: count };
}
