"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/context/context.sesion";

export default function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const { setUser } = useSession();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error("Error al obtener sesión:", error);
        return;
      }

      const { session } = data;
      const accessToken = session.access_token;

      //  Guardar cookie
      await fetch("/api/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: accessToken }),
      });

      //  Guardar en Zustand
      const { id, email, user_metadata, app_metadata } = session.user;
      const full_name = user_metadata?.full_name || user_metadata?.name || "";
      const avatar_url = user_metadata?.avatar_url || "";
      const provider = app_metadata?.provider || "email";

      setUser({
        id,
        email: email || "",
        full_name,
        avatar_url,
        provider,
        isLoggedIn: true,
      });

      // guardar en Supabase
      await supabase.from("users").upsert({
        id,
        email,
        full_name,
        avatar_url,
        provider,
        role_id: 2,
      });

      // 4. Redirigir al usuario
      const redirect = params.get("redirectTo") || "/";
      router.replace(redirect);
    };

    handleAuth();
  }, [router, params, setUser]);

  return (
    <div className="min-h-screen grid place-content-center text-center">
      <p className="text-lg">Autenticando…</p>
    </div>
  );
}
