import { VisualLogin } from "./VisualLogin";
import { Metadata } from "next";

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
    <div className="grid h-full min-h-screen place-items-center grid-cols-1 lg:grid-cols-8  ">
      <VisualLogin />
    </div>
  );
}
