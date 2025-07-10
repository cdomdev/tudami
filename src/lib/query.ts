import { supabase } from "@/lib/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export function getUserProfileQuery(userId: string, client: SupabaseClient = supabase) {
  return client
    .from("users")
    .select(`
      *,
      user_profile_preferences (
        profile_public,
        allow_email,
        allow_whatsapp
      ),
      questions(count),
      question_comments(count),
      user_achievements (
        achievement_id
      )
    `)
    .eq("id", userId)
    .single();
}
