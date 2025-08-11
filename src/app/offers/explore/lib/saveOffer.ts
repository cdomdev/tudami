import { supabase } from "@/utils/supabase/supabaseClient";

export async function toggleSave(offer_id: number, user_id: string) {
    const { data: existing } = await supabase
        .from("offers_saveds")
        .select("id")
        .eq("offer_id", offer_id)
        .eq("user_id", user_id)
        .maybeSingle();
    if (existing) {
        const { error } = await supabase
            .from("offers_saveds")
            .delete()
            .eq("id", existing.id);
        return { saved: false, error };
    } else {
        const { error } = await supabase
            .from("offers_saveds")
            .insert({ offer_id, user_id });
        return { saved: true, error };
    }
}

export async function isOffersSaved(offer_id: number, user_id: string) {
    const { data } = await supabase
        .from("offers_saveds")
        .select("id")
        .eq("offer_id", offer_id)
        .eq("user_id", user_id)
        .maybeSingle();
    return !!data;
}
