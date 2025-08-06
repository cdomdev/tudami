"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "./Search";

export function Header() {
  return (
    <>
      <div className="z-10 w-full pt-24 pb-8 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl px-4 mx-auto mb-4">
          {/* Título y descripción */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Explorar Preguntas y Ofertas
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Descubre preguntas de otros usuarios, comparte tus conocimientos y
              encuentra oportunidades para ayudar o recibir ayuda. ¡Participa,
              aprende y colabora en una comunidad que crece contigo!
            </p>
          </div>

          {/* Buscador y botones */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
            {/* Buscador */}
            <SearchInput />

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto justify-center">
              <Button asChild className="w-full sm:w-auto group">
                <Link href="/create-questions" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                  Nueva pregunta
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="w-full sm:w-auto group"
              >
                <Link href="/explore-offers" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                  Explorar ofertas
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
