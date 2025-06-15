"use client";
import { Modal } from "./ui/Modal";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import Link from "next/link";
import { SheetOffCanvas } from "@/components/SheetOffCanvas"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ToggleTheme";
import FormLogin from "@/components/FormLogin";
import { User } from 'lucide-react'
import { Button } from "./ui/button";

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
      className={`fixed top-0 w-full left-0 px-3 right-0 z-50  transition-all duration-500 ease-in-out
    ${showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}
    ${scrolled
          ? "md:max-w-6xl px-2 md:px-4 mx-auto mt-2 md:mt-4 rounded-full shadow-md backdrop-blur-md bg-white/50"
          : "bg-transparent"
        }
  `}
    >
      <div className="flex items-center justify-between py-2 md:py-3 max-w-7xl mx-auto">
        <div className="flex items-center">

          <Link href="/" className="text-xl md:text-3xl font-bold text-primary">
            Tudami
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex flex-1 relative">
          <NavigationMenuList className="flex gap-4 justify-center w-full">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:!bg-transparent focus:!bg-transparent focus:outline-none ring-0 shadow-none text-sm md:text-base">
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
              <NavigationMenuLink
                asChild
                className="px-4 py-2 text-sm font-medium hover:bg-transparent"
              >
                <Link href="/docs" className="text-sm md:text-base">Herramientas</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className="px-4 py-2 text-sm font-medium hover:bg-transparent"
              >
                <Link href="/docs" className="text-sm md:text-base">Blog</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex md:gap-1 items-center justify-center ">
          <ModeToggle />
          <FormLogin/>
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
          <div className="text-sm font-medium">{title}</div>
          <p className="text-muted-foreground text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

