import { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Ver perfil de usuario", template: "%s | Tudami" },
  description:
    "Explora el perfil de otros aprendices en Tudami. Conoce su experiencia, preguntas, respuestas y forma parte de la comunidad.",
};

export default function LayoutViewProfileUserSsr({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-6xl">{children}</div>;
}
