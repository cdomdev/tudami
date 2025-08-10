import {
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { useSession } from "@/context/context.sesion";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
export function Characteristics() {
  const router = useRouter();
  const { user } = useSession();

  const items = [
    {
      title: "Explora dudas",
      description:
        "Encuentra respuestas públicas a preguntas frecuentes de otros aprendices.",
      href: "/questions/explore",
    },
    {
      title: "Ofertas de ayuda",
      description:
        "Solicita acompañamiento personalizado por parte de otros usuarios.",
      href: "/offers/create",
    },
    {
      title: "Respuestas entre aprendices",
      description:
        "Recibe orientación directa de personas que ya pasaron por lo mismo.",
      href: "/questions/create",
    },
    {
      title: "Ahorra tiempo",
      description:
        "Accede rápidamente a soluciones compartidas por la comunidad.",
      href: "/resources",
    },
  ];

  const handleNavigation = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <NavigationMenuTrigger className="bg-transparent hover:dark:bg-gray-50/5 text-sm md:text-base">
        Características
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul
          className={`grid w-[600px] gap-2 p-4 ${
            user ? "md:grid-cols-2" : "md:grid-cols-1"
          }`}
        >
          {user ? (
            items.map((item) => (
              <ListItem key={item.title} href={item.href} title={item.title}>
                {item.description}
              </ListItem>
            ))
          ) : (
            <div className="flex items-center flex-col justify-center mx-auto">
              <p className="text-sm text-muted-foreground">
                Inicia sesión para acceder a esta característica.
              </p>
              <Button
                variant="secondary"
                className="mt-2 w-full cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
                onClick={handleNavigation}
              >
                Inicia sesión
              </Button>
            </div>
          )}
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
