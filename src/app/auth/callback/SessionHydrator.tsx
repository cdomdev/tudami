"use client";
import { useEffect } from "react";
import { useSession } from "@/context/context.sesion";
import { supabase } from "@/lib/supabase";
import { getUserProfileQuery } from "@/lib/query";

export function SessionHydrator() {
  const { setUser, setLoading, clearUser } = useSession();

  useEffect(() => {
    let isMounted = true;

    const hydrateUser = async () => {
      try {
        const { data: authData, error: authError } =
          await supabase.auth.getUser();

        if (!isMounted) return;

        // Si no hay usuario autenticado, simplemente limpiamos y continuamos sin error
        if (authError || !authData?.user) {
          clearUser();
          return;
        }

        const { id, email, user_metadata, app_metadata } = authData.user;
        const full_name = user_metadata?.full_name || user_metadata?.name || "";
        const avatar_url = user_metadata?.avatar_url || "";
        const provider = app_metadata?.provider || "email";

        const { data: profileData, error: profileError } =
          await getUserProfileQuery(id);

        if (!isMounted) return;

        if (profileError || !profileData) {
          console.error("Error obteniendo perfil del usuario:", profileError);
          clearUser();
          return;
        }

        const userObject = {
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
          created_at: profileData.created_at || new Date().toISOString(),
          profile_public:
            profileData.user_profile_preferences?.profile_public ?? true,
          allow_email:
            profileData.user_profile_preferences?.allow_email ?? false,
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

        setUser(userObject);
      } catch (error) {
        console.error("Error inesperado en SessionHydrator:", error);
        clearUser();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    hydrateUser();

    return () => {
      isMounted = false;
    };
  }, [setUser, setLoading, clearUser]);

  return null;
}
