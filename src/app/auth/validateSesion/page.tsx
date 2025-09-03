"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/Spiner";
import { useSession } from "@/context/context.sesion";

export default function ValidateSessionPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const { setUser } = useSession();

  useEffect(() => {
    const validateSession = async () => {
      try {
        // Intentar refrescar la sesión
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          const data = await response.json();
          setStatus("error");
          setErrorMessage(data.error || "Error al validar la sesión");

          // alimentar el contexto con el usuario

          setUser(data.user);
          // Redirigir al login después de un breve retraso
          setTimeout(() => {
            router.replace(
              `/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`
            );
          }, 2000);

          return;
        }

        // Si todo está bien, redirigir a la página original
        setStatus("success");
        router.replace(redirectTo);
      } catch (error) {
        console.error("Error al validar la sesión:", error);
        setStatus("error");
        setErrorMessage("Error desconocido al validar la sesión");

        // Redirigir al login después de un breve retraso
        setTimeout(() => {
          router.replace(
            `/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`
          );
        }, 2000);
      }
    };

    validateSession();
  }, [redirectTo, router, setUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {status === "loading" && (
        <>
          <Spinner />
          <p className="mt-4 text-center">Validando tu sesión...</p>
        </>
      )}

      {status === "error" && (
        <div className="text-center">
          <p className="text-red-500 mb-2">Error: {errorMessage}</p>
          <p>Redirigiendo al inicio de sesión...</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <p className="text-green-500 mb-2">Sesión validada correctamente</p>
          <p>Redirigiendo...</p>
        </div>
      )}
    </div>
  );
}
