"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function MovilNav({
  openMenu,
  scrolled,
  setOpenMenu,
}: {
  openMenu: boolean;
  scrolled: boolean;
  setOpenMenu: (open: boolean) => void;
}) {
  const router = useRouter();

  function handleNavigate(href: string) {
    setOpenMenu(false);
    router.push(href);
  }

  const routes = [
    { href: "/", label: "Inicio" },
    { href: "/ofertas", label: "Ofertas" },
    { href: "/preguntas", label: "Preguntas" },
    { href: "/perfil", label: "Perfil" },
  ];

  return (
    <div
      className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${openMenu ? "max-h-80 py-3 opacity-100" : "max-h-0 opacity-0"}
          ${scrolled ? " backdrop-blur-none" : "backdrop-blur-sm shadow-none"}
          w-full text-black dark:text-white flex flex-col items-center space-y-4 text-lg font-medium`}
    >
      {routes.map((route) => (
        <Button
          key={route.href}
          variant="link"
          onClick={() => handleNavigate(route.href)}
        >
          {route.label}
        </Button>
      ))}
    </div>
  );
}
