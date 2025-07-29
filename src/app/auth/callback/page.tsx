"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/context/context.sesion";
import { Spinner } from "@/components/Spiner";
import { toast } from "sonner";

export default function AuthCallback() {
  const router = useRouter();
  const params = useSearchParams();
  const { setUser } = useSession();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // 1. Obtener la sesión actual de Supabase
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          console.error("Error al obtener sesión:", error);
          router.replace("/?error=auth_failed");
          return;
        }

        const { session } = data;
        const accessToken = session.access_token;
        const refreshToken = session.refresh_token;

        // 2. Llamar a la nueva API de autenticación unificada
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken, refreshToken }),
        });

        if (!response.ok) {
          toast.error("Error de autenticación. Por favor, inténtalo de nuevo.");
          const errorData = await response.json();
          console.error("Error en autenticación:", errorData.error);
          router.replace("/auth/login/?error=auth_server_failed");
          return;
        }

        const { user } = await response.json();

        // 3. Establecer usuario en el contexto
        setUser(user);

        // 4. Redireccionar al destino original o home
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
