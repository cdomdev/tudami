"use client";

import { Spinner } from "@/components";
import { GoogleIcon } from "@/components/icons/Google";
import { GitHubIcon } from "@/components/icons/GitgubIcon";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useState } from "react";

export function ProvidersAuth() {
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
    <>
      <button
        onClick={() => loginWith("google")}
        disabled={loadingProvider !== null}
        className="bg-blue-600 border border-gray-400 text-white px-4 py-2 rounded-md flex items-center justify-center gap-3 hover:bg-blue-500 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 lg:min-w-sm"
      >
        {loadingProvider === "google" ? (
          <Spinner className="w-5 h-5 text-white" />
        ) : (
          <GoogleIcon className="w-5 h-5 text-white" />
        )}
        Google
      </button>

      <button
        onClick={() => loginWith("github")}
        disabled={loadingProvider !== null}
        className="bg-[#151515] border  border-gray-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-3 hover:bg-gray-950 transition-colors cursor-pointer disabled:opacity-50 mb-2 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
      >
        {loadingProvider === "github" ? (
          <Spinner className="w-5 h-5" />
        ) : (
          <GitHubIcon className="w-5 h-5" />
        )}
        GitHub
      </button>
    </>
  );
}
