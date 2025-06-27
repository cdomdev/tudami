"use client";
import { useEffect } from "react";
import { useSession } from "@/context/context.sesion";
import { supabase } from "@/lib/supabase";

export function SessionHydrator() {
  const { setUser, setLoading, clearUser } = useSession();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          const { id, email, user_metadata, app_metadata } = data.user;
          const full_name = user_metadata?.full_name || user_metadata?.name || "";
          const avatar_url = user_metadata?.avatar_url || "";
          const provider = app_metadata?.provider || "email";

          setUser({ id, email: email || "", full_name, avatar_url, provider });
        } else {
          clearUser();
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    })();
  }, [setUser, setLoading, clearUser]);

  return null;
}
