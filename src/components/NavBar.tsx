"use client";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import Link from "next/link";
import { SheetOffCanvas } from "@/components/SheetOffCanvas";
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
import Session from "../app/auth/validateSesion/ValidateSesion.client";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [showNav] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 10 && !scrolled) {
        setScrolled(true);
      }

      if (currentScroll <= 10 && scrolled) {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 w-screen left-0  px-3 md:px-0 right-0 z-50 transition-all duration-300 ease-in-out
    ${showNav ? "opacity-100 " : "opacity-0 "}
    ${
      scrolled
        ? "bg-white/10 backdrop-blur-md shadow-md"
        : "bg-transparent shadow-none backdrop-blur-0"
    }
  `}
    >
      <div className="flex items-center justify-between  py-3 max-w-6xl mx-auto">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 font-bold text-primary relative transition-all duration-300 text-2xl"
          >
            <Image
              src="/logo.webp"
              width={50}
              height={50}
              alt="logo-tudami"
              className="relative transition-all duration-300"
            />
            Tudami
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex flex-1 relative">
          <NavigationMenuList className="flex gap-4 justify-center w-full">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:dark:bg-gray-50/5 cursor-pointer font-normal text-sm md:text-base">
                Características
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-2 p-4 md:grid-cols-2 ">
                  <ListItem href="/explorar" title="Explora dudas">
                    Encuentra respuestas públicas a preguntas frecuentes de
                    otros aprendices.
                  </ListItem>
                  <ListItem href="/ofertas" title="Ofertas de ayuda">
                    Solicita acompañamiento personalizado por parte de otros
                    usuarios.
                  </ListItem>
                  <ListItem
                    href="/#preguntas"
                    title="Respuestas entre aprendices"
                  >
                    Recibe orientación directa de personas que ya pasaron por lo
                    mismo.
                  </ListItem>
                  <ListItem href="/#faq" title="Ahorra tiempo">
                    Accede rápidamente a soluciones compartidas por la
                    comunidad.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/docs"
                  className="bg-transparent hover:dark:bg-gray-50/5 cursor-pointer  font-normal text-sm md:text-base px-3"
                >
                  Recursos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/docs"
                  className="bg-transparent hover:dark:bg-gray-50/5 cursor-pointer font-normal text-sm md:text-base px-3"
                >
                  Blog
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex md:gap-3 items-center justify-center ">
          <ModeToggle />
          <Session />
          <SheetOffCanvas />
        </div>
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
          className="block select-none rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-none  "
        >
          <div className="text-lg/tight font-normal text-balance">{title}</div>
          <p className="text-muted-foreground text-sm leading-snug text-pretty">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
