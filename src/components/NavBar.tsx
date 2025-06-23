"use client";

import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ToggleTheme";
import Image from "next/image";
import { AlignJustify, X } from "lucide-react";
import Session from "../app/auth/validateSesion/ValidateSesion.client";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [showNav] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 10 && !scrolled) setScrolled(true);
      if (currentScroll <= 10 && scrolled) setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 w-screen left-0 right-0 z-50 transition-all duration-300 ease-in-out px-3 md:px-0
        ${showNav ? "opacity-100" : "opacity-0"}
        ${
          scrolled
            ? "bg-white/10 backdrop-blur-md shadow-md"
            : "bg-transparent shadow-none backdrop-blur-0"
        }`}
    >
      <div className="flex items-center justify-between py-3 max-w-6xl mx-auto">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 font-bold text-primary text-2xl"
          >
            <Image src="/logo.svg" width={50} height={50} className="w-9 h-7" alt="logo-tudami" />
            Tudami
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex flex-1">
          <NavigationMenuList className="flex gap-4 justify-center w-full">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:dark:bg-gray-50/5 text-sm md:text-base">
                Características
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-2 p-4 md:grid-cols-2">
                  <ListItem href="/explorar" title="Explora dudas">
                    Encuentra respuestas públicas a preguntas frecuentes de otros aprendices.
                  </ListItem>
                  <ListItem href="/ofertas" title="Ofertas de ayuda">
                    Solicita acompañamiento personalizado por parte de otros usuarios.
                  </ListItem>
                  <ListItem href="/#preguntas" title="Respuestas entre aprendices">
                    Recibe orientación directa de personas que ya pasaron por lo mismo.
                  </ListItem>
                  <ListItem href="/#faq" title="Ahorra tiempo">
                    Accede rápidamente a soluciones compartidas por la comunidad.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/docs"
                  className="bg-transparent hover:dark:bg-gray-50/5 text-sm md:text-base px-3"
                >
                  Recursos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/docs"
                  className="bg-transparent hover:dark:bg-gray-50/5 text-sm md:text-base px-3"
                >
                  Blog
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex md:gap-3 items-center justify-center">
          <ModeToggle />
          <Session />
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden  text-black dark:text-white relative pl-6"
          >
            {openMenu ? <X className="w-9 h-9" /> : <AlignJustify className="w-9 h-9  " />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${openMenu ? "max-h-80 py-3 opacity-100" : "max-h-0 opacity-0"}
          ${
            scrolled 
              ? " backdrop-blur-none"
              : "backdrop-blur-sm shadow-none"
          }
          w-full text-black dark:text-white flex flex-col items-center space-y-4 text-lg font-medium`}
      >
        <Link href="/" onClick={() => setOpenMenu(false)}>Inicio</Link>
        <Link href="/ofertas" onClick={() => setOpenMenu(false)}>Ofertas</Link>
        <Link href="/preguntas" onClick={() => setOpenMenu(false)}>Preguntas</Link>
        <Link href="/perfil" onClick={() => setOpenMenu(false)}>Perfil</Link>
      </div>
    </nav>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-none"
        >
          <div className="text-lg font-normal">{title}</div>
          <p className="text-muted-foreground text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
