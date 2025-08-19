import { Metadata } from "next";
import Link from "next/link";
import { FormRegister } from "../components/FormRegister";
import { ProvidersAuth } from "../components/Providers";

export const metadata: Metadata = {
  title: "Registro en Tudami",
  description:
    "Accede a Tudami para resolver tus dudas, compartir conocimientos y conectar con otros aprendices. Comparte, aprende y crece con la comunidad.",
  openGraph: {
    title: "Registro en Tudami",
    description:
      "Conéctate con la comunidad de aprendices. Regístrate y participa activamente resolviendo y compartiendo conocimientos.",
    url: "https://tudami.com/auth/login",
    siteName: "Tudami",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tudami App",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Registro en Tudami",
    description:
      "Explora preguntas, responde inquietudes y ayuda a otros. Accede ahora a Tudami.",
    creator: "@tudami",
    images: ["/og-image.png"],
  },
};

export default function RegisterPage() {
  return (
    <div className="py-3 grid place-content max-w-sm ">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Registrate en Tudami
        </h1>

        <p className="text-md text-muted-foreground mt-2">
          Elige un proveedor para iniciar sesión y empezar a compartir,
          preguntar o ayudar en la comunidad.
        </p>
      </div>

      <div className="flex flex-col gap-3 min-w-[300px] w-full">
        <ProvidersAuth />
        <div className="w-full flex items-center gap-1">
          <div className="border-1 w-full border-gray-300"></div>
          <span className="font-bold">o</span>
          <div className="border-1 w-full border-gray-300"></div>
        </div>
        <FormRegister />
        <span className="text-muted-foreground text-sm text-center">
          Al continuar, aceptas los{" "}
          <Link
            href="/terms"
            className="underline underline-offset-2 hover:text-primary"
          >
            Términos de servicio
          </Link>{" "}
          y{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-primary"
          >
            Política de privacidad
          </Link>{" "}
          de Tudami.
        </span>
      </div>
    </div>
  );
}
