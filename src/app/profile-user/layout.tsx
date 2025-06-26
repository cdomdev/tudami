"use client";

import { useSession } from "@/context/context.sesion";
import Image from "next/image";
import Link from "next/link";
import { House, Settings } from "lucide-react";

export default function LayoutProfile({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSession();

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 max-w-6xl mx-auto mt-28"
      role="region"
      aria-labelledby="profile-section-title"
    >
      {/* Barra lateral */}
      <aside
        className="md:col-span-1 max-w-xs pr-4 pl-2 pt-6 hidden md:block bg-accent rounded-xl shadow-md dark:bg-gray-800"
        role="navigation"
        aria-label="Opciones de perfil"
      >
        <h2
          id="profile-section-title"
          className="text-lg font-bold mb-6 text-accent-foreground px-3"
        >
         Opciones
        </h2>

        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                href={`/profile-user?id=${user?.id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-accent-foreground/10 dark:hover:bg-gray-700 text-accent-foreground"
              >
                <House className="size-5 text-primary" />
                <span className="text-sm font-medium">Inicio</span>
              </Link>
            </li>

            <li>
              <Link
                href={`/profile-user/preferencias`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-accent-foreground/10 dark:hover:bg-gray-700 text-accent-foreground"
              >
                <Settings className="size-5 text-primary" />
                <span className="text-sm font-medium">Preferencias</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="md:col-span-5">
        <header
          className="flex mb-6 bg-accent dark:bg-gray-800 p-4 rounded-lg shadow-sm"
          role="banner"
        >
          <Image
            src={user?.avatar_url || "/default-avatar.png"}
            alt={`Avatar de ${user?.full_name}`}
            width={120}
            className="rounded-md mr-4"
            height={120}
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-xl md:text-2xl font-bold flex flex-col ">
              <span className="text-lg bg-gradient-to-r from-indigo-500 to-sky-400 text-transparent bg-clip-text">
                Bienvenido
              </span>
              {user?.full_name}
            </h1>
            <p className="text-xs md:text-sm text-accent-foreground">
              Explora y aprende algo nuevo.
            </p>
          </div>
        </header>
        <nav aria-label="Navegación de perfil ">
          <ul className="flex gap-4 mb-6 bg-accent dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm">
            <li>
              <Link href="#" className="hover:underline">
                Perfil
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline">
                Actividad
              </Link>
            </li>
          </ul>
        </nav>
        <div>{children}</div>
      </main>
    </section>
  );
}
