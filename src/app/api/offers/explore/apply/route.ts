import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)
    const offer_id = searchParams.get("offer_id")
    const user_id = searchParams.get("user_id")
    const supabase = await supabaseServerClient()

    if (!offer_id || !user_id) return NextResponse.json({ error: "Missing offer_id or user_id" })
    try {
        const res = await applyOffer(Number(offer_id), user_id, supabase)
        return NextResponse.json(res)
    } catch (error) {
        console.error("Error on POST [APPLY]", error)
        return NextResponse.json({ error: error })
    }
}

async function applyOffer(offer_id: number, user_id: string, supabase: SupabaseClient) {
    const { error: insertError } = await supabase.from("offers_applications").insert({ offer_id, user_id });

    if (insertError) {
        console.error("Error on funtion apply offer", insertError)
        throw new Error(insertError.message);
    }
}