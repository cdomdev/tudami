import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient"
import { SupabaseClient } from "@supabase/supabase-js"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const offer_id = searchParams.get("offer_id")
    const user_id = searchParams.get("user_id")
    const supabase = await supabaseServerClient()
    if (!offer_id || !user_id) return new Response("Missing data", { status: 400 })
    try {
        const res = await checkIfApply(Number(offer_id), user_id, supabase)
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        console.error("Error delete application", error)
        return new Response("Error", { status: 500 })
    }
}

export const checkIfApply = async (offer_id: number, user_id: string, supabase: SupabaseClient) => {
    const { data } = await supabase
        .from("offers_applications")
        .select("id")
        .eq("offer_id", offer_id)
        .eq("user_id", user_id)
        .maybeSingle();
    return !!data;
};