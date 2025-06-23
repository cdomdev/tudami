import { Metadata } from "next";
import { ButtonGsap } from "@/components/ui/ButtonsGsap";
import Image from "next/image";

export const metadata: Metadata = {
  title: "La pagina no existe",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 py-12 text-center  text-gray-800 dark:text-accent-foreground">
      <span className="hidden dark:inline-block absolute -inset-x-4  size-40 mx-auto rounded-full bg-blue-200/20 blur-3xl z-0" />
      <div className="max-w-md absolute">
        <Image
          src="/404.svg"
          alt="image-404"
          width={220}
          height={220}
          className="mx-auto relative"
        />
        <p className="text-2xl font-semibold">Página no encontrada</p>
        <p className="text-gray-600 dark:text-gray-400 mb-10 text-pretty text-sm px-10 md:text-base md:px-0">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <ButtonGsap
          text="Volver al inicio"
          href="/"
          flairColor="bg-sky-400"
          className="md:text-base sm:text-lg md:w-full font-bold border border-white px-6 py-4 rounded-md bg-gradient-to-r from-red-600  to-sky-600 text-white"
        />
      </div>
    </div>
  );
}
