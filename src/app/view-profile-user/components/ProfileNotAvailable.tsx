"use client"

import { Lock, UserX } from "lucide-react";
import Link from "next/link";

export function ProfileNotAvailable() {
  return (
    <section className="max-w-5xl mx-auto p-6 mt-30">
      {/* Encabezado de perfil no disponible */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-blue-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <UserX className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Perfil no disponible
          </span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Este perfil es privado o no existe
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-center max-w-md">
            El usuario que intentas ver ha configurado su perfil como privado o no se encuentra disponible en este momento.
          </p>
        </div>
      </div>



      {/* Mensaje adicional */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-lg shadow p-6 text-center">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Solo los perfiles públicos permiten ver la información, actividad y medios de contacto.
        </p>
      </div>

      {/* Botón de volver o explorar */}
      <div className="mt-6 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow transition"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
