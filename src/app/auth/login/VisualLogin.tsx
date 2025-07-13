"use client";

import Image from "next/image";
import { GoogleIcon } from "@/components/icons/Google";
import { GitHubIcon } from "@/components/icons/GitgubIcon";
import { Spinner } from "@/components/Spiner";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";


export function VisualLogin() {
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
            <article className="lg:col-span-3 relative bg-custom-card flex flex-col justify-center items-center w-full h-full px-6 py-8 overflow-hidden">
                <div className="relative z-10 text-center space-y-4 animate-me" aria-hidden="true">
                    <Image
                        src="/logo.svg"
                        alt="Logo Tudami"
                        width={90}
                        height={90}
                        className="mx-auto mb-6"
                        priority
                    />
                    <h2 className="text-3xl lg:text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-sky-500 to-teal-400">
                        Aprende con otros,<br />comparte con todos.
                    </h2>
                    <p className="text-sm lg:text-base max-w-xs mx-auto text-slate-700 dark:text-slate-300">
                        Únete a Tudami y conecta con aprendices que quieren ayudarte a crecer.
                    </p>
                </div>

                {/* Contenido accesible para lectores de pantalla */}
                <p className="sr-only">
                    Aprende con otros, comparte con todos. Únete a Tudami y conecta con aprendices que quieren ayudarte a crecer.
                </p>

                <div className="absolute bottom-6 z-0 w-48 lg:w-64 opacity-90 dark:opacity-70">
                    <Image
                        src="/mascota-tudami.svg"
                        alt="Mascota Tudami"
                        width={300}
                        height={300}
                        className="w-full h-auto select-none pointer-events-none"
                        priority
                    />
                </div>
            </article>

            <article className="grid place-items-center w-full h-full px-4 lg:col-span-3">
                <div className="py-3 grid place-content max-w-sm ">


                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
                            Crea tu cuenta en Tudami
                        </h1>

                        <p className="text-md text-muted-foreground mt-2">
                            Elige un proveedor para registrarte y empezar a compartir, preguntar o ayudar en la comunidad.
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
                            className="bg-[#151515] border  border-gray-500 text-white px-4 py-2 rounded-md flex items-center justify-center gap-3 hover:bg-gray-950 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900"
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
                        <span className="text-muted-foreground text-sm text-center">
                            Al continuar, aceptas nuestros{" "}
                            <Link href="#" className="underline underline-offset-2 hover:text-primary">
                                Términos de servicio
                            </Link>{" "}
                            y{" "}
                            <Link href="#" className="underline underline-offset-2 hover:text-primary">
                                Política de privacidad
                            </Link>.
                        </span>

                    </div>
                </div>
            </article>
        </>
    );
}
