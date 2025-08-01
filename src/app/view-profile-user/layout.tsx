import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil de usuario",
  description: "Visualiza y edita tu perfil de usuario en Tudami.",
};

export default function LayoutViewProfileUserSsr({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-6xl">{children}</div>;
}
