import { Metadata } from "next";
import { FormForgot } from "../components/FormForgot";

export const metadata: Metadata = {
  title: {
    default: "Restablecer contraseña",
    template: "%s | Tudami",
  },
  description:
    "Restablece tu contraseña y recupera el acceso a Tudami para seguir aprendiendo, compartiendo y conectando con la comunidad.",
};

export default function ForgotPage() {
  return (
    <div className="py-3 grid place-content max-w-sm md:w-full">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
          ¿Olvidaste tu contraseña?
        </h1>

        <p className="text-md text-muted-foreground mt-2">
          Escribe tu correo electrónico y te enviaremos un enlace para
          restablecer la contraseña.
        </p>
      </div>

      <div className="flex flex-col gap-3 min-w-[300px] w-full">
        <FormForgot />
      </div>
    </div>
  );
}
