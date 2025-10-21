import {
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { useSession } from "@/context/context.sesion";
export function Characteristics() {
  const { user } = useSession();

  const items = [
    {
      title: "Explora dudas",
      description:
        "Encuentra respuestas públicas a preguntas frecuentes de otros aprendices.",
      href: user ? "/questions/explore" : "/auth/login",
    },
    {
      title: "Ofertas de ayuda",
      description:
        "Solicita acompañamiento personalizado por parte de otros usuarios.",
      href: user ? "/offers/create" : "/auth/login",
    },
    {
      title: "Respuestas entre aprendices",
      description:
        "Recibe orientación directa de personas que ya pasaron por lo mismo.",
      href: user ? "/questions/create" : "/auth/login",
    },
    {
      title: "Aprende y gana ayudando",
      description:
        "Explora ofertas donde tu apoyo y habilidades fortalecen la experiencia de otros.",
      href: user ? "/offers/explore" : "/auth/login",
    },
  ];

  return (
    <>
      <NavigationMenuTrigger className="bg-transparent hover:dark:bg-gray-50/5 text-sm md:text-base">
        Características
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className={`grid w-[600px] gap-2 p-4  md:grid-cols-2 `}>
          {items.map((item) => (
            <ListItem key={item.title} href={item.href} title={item.title}>
              {item.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </>
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
