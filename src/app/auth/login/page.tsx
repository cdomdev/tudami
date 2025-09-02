import { Metadata } from "next";
import { FormLogin } from "../components/Form";
import { ProvidersAuth } from "../components/Providers";
import { FooterForm } from "../components/FooterForm";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description:
    "Accede a Tudami para resolver tus dudas, compartir conocimientos y conectar con otros aprendices. Comparte, aprende y crece con la comunidad.",
  openGraph: {
    title: "Inicia sesión en Tudami",
    description:
      "Conéctate con la comunidad de aprendices. Inicia sesión y participa activamente resolviendo y compartiendo conocimientos.",
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
    title: "Inicia sesión en Tudami",
    description:
      "Explora preguntas, responde inquietudes y ayuda a otros. Accede ahora a Tudami.",
    creator: "@tudami",
    images: ["/og-image.png"],
  },
};

export default function AuthPage() {
  return (
    <div className="py-3 grid place-content max-w-sm ">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
          Inicia sesión en Tudami
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
        <FormLogin />
        <FooterForm />
      </div>
    </div>
  );
}
