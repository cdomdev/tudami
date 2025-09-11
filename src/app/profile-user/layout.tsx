"use client";

import { useSession } from "@/context/context.sesion";
import Image from "next/image";
import Link from "next/link";
import { House, Settings, Bookmark, Edit, FileUser } from "lucide-react";

export default function LayoutProfile({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSession();

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-6 gap-2 p-4 max-w-6xl mx-auto mt-20 md:mt-24"
      role="region"
      aria-labelledby="profile-section-title"
    >
      <aside
        className="md:col-span-1 max-w-xs pr-4 pl-2 pt-6 hidden md:block  rounded-sm shadow-sm dark:bg-custom-card h-64 max-h-80"
        role="navigation"
        aria-label="Opciones de perfil"
      >
        <h2
          id="profile-section-title"
          className="text-lg font-bold mb-6 text-accent-foreground px-3"
        >
          Opciones
        </h2>
        <nav aria-label="Navegación de perfil">
          <MapItems
            id={user?.id}
            full_name={user?.full_name}
            className="rounded-md"
          />
        </nav>
      </aside>

      <main className="md:col-span-5">
        <header
          className="flex mb-2 dark:bg-custom-card p-4 rounded-sm shadow-sm"
          role="banner"
        >
          <Image
            src={user?.avatar_url || "/avatar_default.png"}
            alt={`Avatar de ${user?.full_name}`}
            width={120}
            className="rounded-sm mr-4 object-contain"
            height={120}
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-xl md:text-2xl font-bold flex flex-col ">
              <span className="text-lg bg-gradient-to-r from-indigo-500 to-sky-400 text-transparent bg-clip-text">
                Bienvenido
              </span>
              {user?.full_name || "Anonimo"}
            </h1>
            <p className="text-xs md:text-sm text-accent-foreground">
              {user?.bio ||
                "¡Cuéntanos sobre ti! Puedes agregar una biografía en la sección de cuanta."}
              <Link
                href={`/profile-user/account-setting/edit?id=${user?.id}`}
                className="text-blue-500 pl-3 hover:underline"
              >
                <Edit className="inline size-4" />
                <span className="sr-only">link navigate edit profile</span>
              </Link>
            </p>
          </div>
        </header>
        <nav
          aria-label="Navegación de perfil"
          className="md:hidden overflow-x-auto"
        >
          <MapItems
            id={user?.id}
            full_name={user?.full_name}
            className="border bg-custom-card rounded-sm md:hidden overflow-x-auto"
          />
        </nav>
        {children}
      </main>
    </section>
  );
}

function MapItems({
  id,
  full_name,
  className,
}: {
  id?: string;
  full_name?: string;
  className: string;
}) {
  const itemsSide = [
    {
      name: "Inicio",
      href: `/profile-user?id=${id}`,
      icon: House,
    },
    {
      name: "Cuenta",
      href: `/profile-user/account-setting?name=${full_name}&id=${id}`,
      icon: Settings,
    },
    {
      name: "Guardados",
      href: `/profile-user/save?page=questions&user_id=${id}`,
      icon: Bookmark,
    },
    {
      name: "Ofertas",
      href: `/profile-user/offers?user_id=${id}`,
      icon: FileUser,
    },
  ];
  return (
    <ul className="flex gap-2 my-3 md:my-0 rounded-xs  md:flex-col ">
      {itemsSide.map((item, i) => (
        <li key={i} aria-label={item.name}>
          <Link
            href={item.href}
            className={`${className} flex items-center gap-3 px-3 py-2  transition-colors hover:bg-accent-foreground/10 dark:cusbg-custom-card text-accent-foreground`}
          >
            <item.icon className="size-5 text-primary" />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
