"use client";
import { ChevronRight } from "lucide-react";
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
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-in-out
    ${showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}
    ${
      scrolled
        ? "max-w-[90%] mx-auto mt-4 rounded-full shadow-md backdrop-blur-md bg-white/40"
        : "bg-transparent"
    }
  `}
    >
      <div className="flex items-center justify-between  py-3 max-w-11/12 mx-auto">
        <Link href="/" className="text-xl font-bold text-primary">
          Tudami
        </Link>

        <NavigationMenu className="flex-1 relative">
          <NavigationMenuList className="flex gap-4 justify-center w-full">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:!bg-transparent focus:!bg-transparent focus:outline-none ring-0 shadow-none">
                Componentes
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 p-4 md:grid-cols-2">
                  <ListItem
                    href="/docs/componentes/alerta"
                    title="Alert Dialog"
                  >
                    Un modal que interrumpe al usuario con contenido importante.
                  </ListItem>
                  <ListItem href="/docs/componentes/tooltip" title="Tooltip">
                    Muestra información cuando pasas el mouse o haces foco.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:!bg-transparent focus:!bg-transparent focus:outline-none ring-0 shadow-none">
                List
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4 p-4">
                  <ListItem href="/componentes" title="Componentes">
                    Explora todos los componentes de la librería.
                  </ListItem>
                  <ListItem href="/blog" title="Blog">
                    Lee las últimas novedades.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="px-4 py-2 text-sm font-medium hover:bg-transparent"
              >
                <Link href="/docs">Docs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex gap-4 items-center justify-center">
          <ModeToggle />
          <Link
            href="/login"
            className="relative border overflow-hidden rounded-full bg-white border-gray-400 py-2 px-4 flex items-center justify-center font-medium text-gray-800 group transition-colors"
          >
            <span className="relative z-10">Iniciar sesión</span>
            <ChevronRight className="relative z-10 text-gray-700 ml-1 size-5" />
            <span
              className="absolute inset-0 w-full h-full bg-gray-200 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0"
              aria-hidden="true"
            />
          </Link>
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
          <div className="text-sm font-medium">{title}</div>
          <p className="text-muted-foreground text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
