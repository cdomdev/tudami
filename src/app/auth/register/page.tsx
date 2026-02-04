import { Metadata } from "next";
import { FormRegister } from "../components/FormRegister";
import { ProvidersAuth } from "../components/Providers";
import { FooterForm } from "../components/FooterForm";

export const metadata: Metadata = {
  title: {
    default: "Regístrate en Tudami",
    template: "%s | Tudami",
  },
  description:
    "Regístrate gratis en Tudami y empieza a resolver dudas, compartir tus conocimientos y conectar con otros aprendices. Únete a la comunidad y potencia tus habilidades.",
};


export default function RegisterPage() {
  return (
    <div className="py-3 grid place-content max-w-sm ">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Registrate en Tudami
        </h1>

        <p className="text-md text-muted-foreground mt-2">
          Elige un proveedor para registrarte y empezar a compartir,
          preguntar o ayudar en la comunidad.
        </p>
      </div>

      <div className="flex flex-col gap-3 min-w-75 w-full">
        <ProvidersAuth />
        <div className="w-full flex items-center gap-1">
          <div className="border w-full border-gray-300"></div>
          <span className="font-bold">o</span>
          <div className="border w-full border-gray-300"></div>
        </div>
        <FormRegister />
        <FooterForm />
      </div>
    </div>
  );
}
