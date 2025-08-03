import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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



        <Link
          href="/"
          className="md:justify-center  md:hover:scale-105 inline-flex items-center justify-center w-full  font-bold text-white text-base sm:text-lg transition-all duration-300 hover:brightness-110 focus:outline-none"
        >
          <div className="flex items-center">
            <span className="relative inline-flex overflow-hidden  p-[1px]">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3bbac6_0%,#265d7d_50%,#3bbac6_100%)]"></span>
              <div className="inline-flex items-center justify-center w-full px-40 py-4 text-sm text-sky-400-800 bg-sky-500-100  cursor-pointer bg-gray-100 dark:bg-gray-800 text-black dark:text-white/80 backdrop-blur-3xl whitespace-nowrap">
                Volver al inicio
              </div>
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
