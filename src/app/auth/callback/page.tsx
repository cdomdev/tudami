"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Spinner } from "@/components/Spiner";
import { toast } from "sonner";
import { loginCallback } from "../lib/auth";
import { useSession } from "@/context/context.sesion";
export default function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const { setUser } = useSession()

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          console.error("Error al obtener sesión:", error);
          router.replace("/?error=auth_failed");
          return;
        }

        const { session } = data;
        const accessToken = session.access_token;
        const refreshToken = session.refresh_token;

        const res = await loginCallback(accessToken, refreshToken);

        if (!res.ok) {
          toast.error("Error de autenticación. Por favor, inténtalo de nuevo.");
          const errorData = await res.json();
          console.error("Error en autenticación:", errorData.error);
          router.replace("/auth/login/?error=auth_server_failed");
          return;
        }

        // extraer y setear usuario en el contexto
        const dataRes = await res.json()
        const { user } = dataRes
        setUser(user)

        const redirect = params.get("redirectTo") || "/";
        router.replace(redirect);
      } catch (error) {
        console.error("Error inesperado en autenticación:", error);
        router.replace("/auth/login/?error=unexpected_error");
      }
    };

    handleAuth();
  }, [router, params, setUser]);

  return (
    <div className="min-h-screen grid place-content-center text-center">
      <Spinner className="w-7 h-7 inline-flex mx-auto" />
      <p className="text-lg">Autenticando…</p>
    </div>
  );
}
