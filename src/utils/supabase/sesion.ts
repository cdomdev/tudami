import { cookies } from "next/headers";
import { supabaseClient } from "@/utils/supabase/supabaseClient";

export async function getServerUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sb-access-token")?.value;
  if (!sessionToken) return null;
  const supabase = await supabaseClient();

  const { data: userData, error: userError } = await supabase.auth.getUser(
    sessionToken
  );

  if (userError || !userData?.user) return null;

  const { id, email, user_metadata, app_metadata } = userData.user;
  const full_name = user_metadata?.full_name || user_metadata?.name || "";
  const avatar_url = user_metadata?.picture || user_metadata.avatar_url || "";
  const provider = app_metadata?.provider || "email";

  const { data: profileData, error } = await supabase
    .from("users")
    .select(
      `
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
    `
    )
    .eq("id", id)
    .single();
  if (error || !profileData) {
    console.error("Error obteniendo perfil del usuario:", error);
    return null;
  }


  return {
    id,
    email: email || "",
    full_name,
    avatar_url,
    provider,
    phone: profileData.phone || "",
    bio: profileData.bio || "",
    country: profileData.country || "Colombia",
    department: profileData.department || "",
    city: profileData.city || "",
    approval_token: profileData.approval_token || null,
    created_at: profileData.created_at || null,
    profile_public:
      profileData.user_profile_preferences?.profile_public ?? true,
    allow_email: profileData.user_profile_preferences?.allow_email ?? false,
    allow_whatsapp:
      profileData.user_profile_preferences?.allow_whatsapp ?? false,
    reputation: {
      questions: profileData.questions?.[0]?.count ?? 0,
      responses: profileData.question_comments?.[0]?.count ?? 0,
      score: "bronze",
      achievement: {
        achievement_id:
          profileData.user_achievements?.[0]?.achievement_id ?? null,
      },
    },
  };
}
