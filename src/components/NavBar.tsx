"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { AlignJustify, X } from "lucide-react";
import Session from "../app/auth/validateSesion/ValidateSesion.client";
import { ModeToggle } from "./ToggleTheme";
import { Characteristics } from "./header/charactheristics";
import { MovilNav } from "./header/MovilNav";
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
            <Image
              src="/logo.svg"
              width={35}
              height={35}
              alt="logo-tudami"
            />
            Tudami
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex flex-1">
          <NavigationMenuList className="flex gap-4 justify-center w-full">
            <NavigationMenuItem>
              <Characteristics />
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
            <ModeToggle />
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex md:gap-3 items-center justify-center">
          <Session />
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden  text-black dark:text-white relative pl-6"
          >
            {openMenu ? (
              <X className="w-8 h-8" />
            ) : (
              <AlignJustify className="w-8 h-8  " />
            )}
            <span className="sr-only">{openMenu ? "Cerrar menú" : "Abrir menú"}</span>
          </button>
        </div>
      </div>

      <MovilNav
        openMenu={openMenu}
        scrolled={scrolled}
        setOpenMenu={setOpenMenu}
      />
    </nav>
  );
}
