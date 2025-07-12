"use client";

import Image from "next/image";
import { GoogleIcon } from "@/components/icons/Google";
import { GitHubIcon } from "@/components/icons/GitgubIcon";
import { Spinner } from "@/components/Spiner";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);

  const HOST = process.env.NEXT_PUBLIC_HOST;

  const loginWith = async (provider: "google" | "github") => {
    try {
      setLoadingProvider(provider);

      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${HOST}/auth/callback`,
        },
      });
    } catch (error) {
      console.error(`Error al iniciar sesión con ${provider}:`, error);
      setLoadingProvider(null);
    }
  };

  return (
    <section className="grid min-h-screen place-items-center grid-cols-1 lg:grid-cols-2 gap-1 ">
      <article className="w-full h-full"></article>
      <article className="grid place-items-center w-full h-full px-4">
        <div className="py-3 grid place-content max-w-sm ">
          <div className="relative flex justify-center items-center mb-10">
            <Image
              className="relative z-10"
              src="/logo.svg"
              alt="logo-tudami"
              width={130}
              height={130}
            />
          </div>

          <div className="text-center mb-6">
            <h1 className="text-lg font-semibold text-slate-800 dark:text-white">
              Bienvenido a Tudami
            </h1>
            <p className="text-sm/tight text-muted-foreground mx-auto py-2">
              Inicia sesión para compartir tus dudas, explorar respuestas o
              ayudar a otros.
            </p>
          </div>

          <div className="flex flex-col gap-3 min-w-[300px] w-full">
            <button
              onClick={() => loginWith("google")}
              disabled={loadingProvider !== null}
              className="bg-blue-600 border border-gray-200 text-white px-4 py-2 rounded-md flex items-center justify-center gap-3 hover:bg-blue-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 min-w-sm"
            >
              {loadingProvider === "google" ? (
                <>
                  <Spinner className="w-5 h-5 text-white" />
                  Conectando con Google...
                </>
              ) : (
                <>
                  <GoogleIcon className="w-5 h-5 text-white" />
                  Google
                </>
              )}
            </button>

            <button
              onClick={() => loginWith("github")}
              disabled={loadingProvider !== null}
              className="bg-[#151515] border border-gray-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-3 hover:bg-gray-950 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
            >
              {loadingProvider === "github" ? (
                <>
                  <Spinner className="w-5 h-5" />
                  Conectando con GitHub...
                </>
              ) : (
                <>
                  <GitHubIcon className="w-5 h-5" />
                  GitHub
                </>
              )}
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
