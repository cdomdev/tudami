"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { AlignJustify, X } from "lucide-react";
import { ViewOptionAuth } from "@/components/sesion/ViewOptionAuth";
import { Characteristics } from "./charactheristics";
import { MovilNav } from "./MovilNav";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [showNav] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const route = usePathname();
  const isLoginPage = route === "/auth/login";
  const isCallbackPage = route === "/auth/callback";
  const isRegisterPage = route === "/auth/register";
  const isForgotPage = route === "/auth/forgot-password";
  const isAdminPage = route === "/admin" || route.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 10 && !scrolled) setScrolled(true);
      if (currentScroll <= 10 && scrolled) setScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  if (
    isLoginPage ||
    isCallbackPage ||
    isRegisterPage ||
    isForgotPage ||
    isAdminPage
  ) {
    return null;
  }
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
      <div className="flex items-center justify-between py-3 md:px-4 lg:px-0 max-w-6xl mx-auto">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 font-bold text-primary text-2xl"
          >
            <Image src="/logo.svg" width={35} height={35} alt="logo-tudami" />
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
                  href="/resources"
                  className="bg-transparent hover:dark:bg-gray-50/5 text-sm md:text-base px-3"
                >
                  Recursos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/news"
                  className="bg-transparent hover:dark:bg-gray-50/5 text-sm md:text-base px-3"
                >
                  Noticias
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex md:gap-3 items-center justify-center">
          <ViewOptionAuth />
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden  text-black dark:text-white relative pl-6"
          >
            {openMenu ? (
              <X className="w-8 h-8" />
            ) : (
              <AlignJustify className="w-8 h-8  " />
            )}
            <span className="sr-only">
              {openMenu ? "Cerrar menú" : "Abrir menú"}
            </span>
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
