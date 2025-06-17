"use client";
import { useState } from "react";
import { User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GoogleIcon } from "./icons/Google";
import { GitHubIcon } from "./icons/GitgubIcon";

export default function FormLogin() {
  const [open, setOpen] = useState(false);

  const loginWith = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        className="bg-transparent px-3 py-6 text-base md:text-lg rounded-xl cursor-pointer "
      >
        <span className="bg-blue-500 text-white rounded-full p-1.5">
          <User className="size-5" />
        </span>
        <span className="hidden md:flex font-bold">Iniciar sesion</span>
      </Button>
      <Modal modalTitle="Iniciar sesión" isOpen={open} onOpenChange={setOpen}>
        <div className="p-6 grid place-content-center">
          <div className="relative flex justify-center items-center mb-4">
            <Image
              className="relative z-10"
              src="/board.webp"
              alt="Ilustración de ayuda mutua"
              width={160}
              height={160}
            />
          </div>

          <div className="text-center mb-6">
            <h4 className="text-lg font-semibold text-slate-800 dark:text-gray-100">
              Bienvenido a Tudami
            </h4>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto ">
              Inicia sesión para compartir tus dudas, explorar respuestas o
              ayudar a otros.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={() => loginWith("google")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-3 hover:bg-blue-500 transition-colors cursor-pointer"
            >
              <GoogleIcon className="w-5 h-5" />
              Continuar con Google
            </button>

            <button
              onClick={() => loginWith("github")}
              className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <GitHubIcon className="w-5 h-5" />
              Continuar con GitHub
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
