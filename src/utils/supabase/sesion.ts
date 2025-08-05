import { cookies } from "next/headers";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { getUserProfile, buildUserContextObject } from "@/lib/user-profile";

export async function getServerUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sb-access-token")?.value;
  if (!sessionToken) return null;
  const supabase = await supabaseServerClient();

  const { data: userData, error: userError } = await supabase.auth.getUser(
    sessionToken
  );

  if (userError || !userData?.user) return null;
  const { id, email, user_metadata, app_metadata } = userData.user;
  const full_name = user_metadata?.full_name || user_metadata?.name || "";
  const avatar_url = user_metadata?.picture || user_metadata.avatar_url || "";
  const provider = app_metadata?.provider || "email";

  try {

    const userProfile = await getUserProfile(id, supabase);

    return buildUserContextObject({
      id,
      email,
      full_name,
      avatar_url,
      provider,
      userProfile
    });
  } catch (error) {
    console.error("Error obteniendo perfil del usuario:", error);
    return null;
  }
}
