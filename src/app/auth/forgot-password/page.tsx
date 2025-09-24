import { Metadata } from "next";
import { FormForgot } from "../components/FormForgot";

export const metadata: Metadata = {
    title: "Restablecer contraseña",
    description:
        "Restablece tu contrasela para que puedas acceder a Tudami para resolver tus dudas, compartir conocimientos y conectar con otros aprendices. Comparte, aprende y crece con la comunidad.",
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

export default function ForgotPage() {
    return (
        <div className="py-3 grid place-content max-w-sm md:w-full">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
                    ¿Olvidaste tu contraseña?
                </h1>

                <p className="text-md text-muted-foreground mt-2">
                    Escribe tu correo electrónico y te enviaremos un enlace para restablecer la contraseña.
                </p>
            </div>

            <div className="flex flex-col gap-3 min-w-[300px] w-full">
                <FormForgot />
            </div>
        </div>
    );
}
