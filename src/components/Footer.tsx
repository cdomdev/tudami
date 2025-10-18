"use client";

import Link from "next/dist/client/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DialogOpinions } from "./DialogOpinions";

export function Footer() {
  const pathName = usePathname();
  const isAdminPage = pathName === "/admin" || pathName.startsWith("/admin");

  if (isAdminPage) return null;
  return (
    <footer className="w-screen overflow-y-hidden bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-950 dark:to-[#0d1117] text-gray-700 dark:text-gray-300 py-5">
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="text-center space-y-2">
          <Image
            src="/logo.svg"
            alt="Tudami Logo"
            width={80}
            height={80}
            className="mx-auto"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Aprende con otros. Comparte con todos.
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-sky-100 transition-colors duration-300" />

        <div className="grid grid-cols-1 sm:grid-cols-1  lg:grid-cols-2 gap-6 text-center my-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
            <div className="flex flex-col items-start  text-left">
              <h4 className="text-base font-semibold mb-3 uppercase text-gray-700 dark:text-gray-300">
                Comunidad
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#faq"
                    className="hover:text-blue-600 dark:hover:text-sky-400"
                  >
                    Preguntas frecuentes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-600 dark:hover:text-sky-400"
                  >
                    Sobre nosotros
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start  text-left">
              <h4 className="text-base font-semibold mb-3 uppercase text-gray-700 dark:text-gray-300">
                Participa
              </h4>
              <ul className="space-y-2">
                <li>
                  <DialogOpinions
                    textBtn="Opinar sobre Tudami"
                    variant="ghost"
                  /> 
                </li>
                <li>
                  <Link
                    href="/questions/create"
                    className="hover:text-blue-600 dark:hover:text-sky-400"
                  >
                    Hacer una pregunta
                  </Link>
                </li>
                <li>
                  <Link
                    href="/offers/create"
                    className="hover:text-blue-600 dark:hover:text-sky-400"
                  >
                    Publicar una oferta
                  </Link>
                </li>
                <li>
                  <Link
                    href="/offers/explore"
                    className="hover:text-blue-600 dark:hover:text-sky-400"
                  >
                    Ver ofertas
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start  text-left">
              <h4 className="text-base font-semibold mb-3 uppercase text-gray-700 dark:text-gray-300">
                Politicas
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-blue-600 dark:hover:text-sky-400"
                  >
                    Términos de uso
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-blue-600 dark:hover:text-sky-400"
                  >
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="hover:text-blue-600 dark:hover:text-sky-400"
                  >
                    Política de cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center text-sm">
            <p className="mb-2">Síguenos en nuestras redes sociales</p>
            <div className="flex justify-center gap-6 text-gray-500 dark:text-gray-400">
              <a
                href="#"
                className="hover:text-[#ED2E7E] dark:hover:text-pink-400"
              >
                Facebook
              </a>
              <a
                href="#"
                className="hover:text-[#4696FF] dark:hover:text-sky-400"
              >
                Instagram
              </a>
              <a href="#" className="hover:text-blue-600 dark:hover:text-white">
                X
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-sky-100 transition-colors duration-300" />

        <div className="text-center text-xs text-gray-700 dark:text-gray-300 max-w-md mx-auto text-balance">
          &copy; {new Date().getFullYear()} Tudami. Todos los derechos
          reservados. Las marcas, logotipos y productos mencionados son
          propiedad de sus respectivos titulares.
        </div>
      </div>
    </footer>
  );
}
