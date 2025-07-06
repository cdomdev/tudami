
import { User } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GoogleIcon } from "./icons/Google";
import { GitHubIcon } from "./icons/GitgubIcon";
import { useSession } from "@/context/context.sesion";

export default function FormLogin() {
  const { isModalOpen, openModal, closeModal } = useSession();

  const HOST = process.env.NEXT_PUBLIC_HOST

  const loginWith = async (provider: "google" | "github") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${HOST}/auth/callback`,
      },
    });
  };


  return (
    <>
      <Button
        onClick={() => openModal()}
        variant="ghost"
        className="bg-transparent hover:dark:bg-gray-50/5 px-3 py-6 text-sm md:text-base rounded-base cursor-pointer "
      >
        <span className="bg-blue-500 text-white rounded-full p-1.5">
          <User className="size-5" />
          <span className="sr-only">Iniciar sesion</span>
        </span>
        <span className="hidden md:flex font-semibold">Iniciar sesion</span>
      </Button>
      <Modal
        modalTitle="Iniciar sesión"
        isOpen={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          }
        }}
      >
        <div className="py-3 grid place-content ">
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
            <h4 className="text-lg font-semibold text-slate-800 dark:text-white ">
              Bienvenido a Tudami
            </h4>
            <p className="text-sm/tight text-muted-foreground  mx-auto ">
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
              className="bg-gray-900 text-white px-4 py-2 rounded-md flex items-center justify-center gap-3 hover:bg-gray-950 transition-colors cursor-pointer"
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
