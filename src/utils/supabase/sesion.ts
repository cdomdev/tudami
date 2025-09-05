import { cookies } from "next/headers";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { getDataUser } from "@/app/api/user/helpers/helper.user"

export async function getServerUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sb-access-token")?.value;
  // const approvaltoken = cookieStore.get("approval_token")?.value;
  if (!sessionToken) return null;
  const supabase = await supabaseServerClient();

  const { data: userData, error: userError } = await supabase.auth.getUser(
    sessionToken
  );

  if (userError || !userData?.user) return null;
  const { id,
    //  email, user_metadata, app_metadata 
  } = userData.user;
  // const full_name = user_metadata?.full_name || user_metadata?.name || "";
  // const avatar_url = user_metadata?.picture || user_metadata.avatar_url || "";
  // const provider = app_metadata?.provider || "email";

  try {

    const userProfile = await getDataUser(id, supabase);
    return userProfile
  } catch (error) {
    console.error("Error obteniendo perfil del usuario:", error);
    return null;
  }
}
