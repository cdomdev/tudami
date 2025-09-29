import { Metadata } from "next";
import { FormUpdate } from "../components/FormUpdatePss";

export const metadata: Metadata = {
  title: "Restablecer contraseña",
  description:
    "Crea una nueva contraseña para recuperar el acceso a tu cuenta en Tudami. Asegúrate de elegir una clave segura que solo tú conozcas.",
  openGraph: {
    title: "Restablecer contraseña - Tudami",
    description:
      "Crea una nueva contraseña y recupera el acceso a tu cuenta en Tudami.",
    url: "https://tudami.com/auth/update-password",
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
    title: "Restablecer contraseña - Tudami",
    description:
      "Crea una nueva contraseña y recupera el acceso a tu cuenta en Tudami.",
    creator: "@tudami",
    images: ["/og-image.png"],
  },
};

export default function UpdatePasswordPage() {
  return (
    <div className="py-8 grid place-content-center px-4  mt-20">
      <div className="max-w-sm w-full space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
            Restablece tu contraseña
          </h1>
          <p className="text-md text-muted-foreground mt-2 text-pretty">
            Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta.
            Asegúrate de usar una clave segura que solo tú conozcas.
          </p>
        </div>

        <FormUpdate />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            ¿Recordaste tu contraseña?
            <a href="/auth/login" className="ml-1 font-semibold underline">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
