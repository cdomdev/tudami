"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

export function SectionNavNewResource() {
  const path = usePathname();
  if (path !== "/resources") return null;
  return (
    <section className="my-10 flex flex-col items-center justify-center space-y-4 text-center">
      <h3 className="text-xl font-semibold text-foreground">
        ¿Tienes un recurso que pueda ayudar a la comunidad?
      </h3>
      <p className="max-w-md text-sm text-gray-600 dark:text-gray-400">
        Este espacio es construido por y para todos. Si conoces cursos, guías,
        herramientas o cualquier material útil, compártelo con la comunidad.
      </p>
      <Link
        href="/resources/new"
        className="flex items-center text-sm group gap-2 border rounded-sm px-4 py-2 dark:bg-accent-foreground text-black"
      >
        <Plus className="w-4 h-4 group-hover:rotate-90" />
        Solictar agregar recurso
      </Link>
    </section>
  );
}
