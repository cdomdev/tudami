import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Visualiza y edita tu perfil de usuario en Tudami.",
};

export default function LayoutNews({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="max-w-7xl mx-auto mt-20">
        <nav>
          <ul className="inline-flex justify-center w-full border-t border-b">
            <li className="hover:bg-accent p-2 cursor-pointer font-semibold">
              <Link href="/news">Inicio</Link>
            </li>
            <li className="hover:bg-accent p-2 cursor-pointer font-semibold">
              <Link href="/news/about">Acerca de</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="max-w-6xl mx-auto mb-20">{children}</main>
    </>
  );
}
