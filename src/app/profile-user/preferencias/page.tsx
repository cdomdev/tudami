"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function PreferenciasTema() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const opcionesTema = [
    {
      id: "light",
      titulo: "Claro",
      descripcion: "Ideal para espacios bien iluminados.",
      fondo: "bg-white",
      texto: "text-gray-800",
      ui: "border border-gray-300",
    },
    {
      id: "dark",
      titulo: "Oscuro",
      descripcion: "Relaja la vista en entornos oscuros.",
      fondo: "bg-gray-900",
      texto: "text-white",
      ui: "border border-gray-700",
    },
    {
      id: "system",
      titulo: "Sistema",
      descripcion: "Se adapta automáticamente al sistema operativo.",
      fondo: "bg-gradient-to-r from-white via-gray-200 to-gray-900",
      texto: "text-gray-800 dark:text-white",
      ui: "border border-gray-400 dark:border-gray-600",
    },
  ];

  return (
    <section className="space-y-10">
      <article
        className="p-6 dark:bg-slate-800 bg-white rounded-2xl shadow-md"
        role="region"
        aria-labelledby="opciones-tema-title"
      >
        <h2 id="opciones-tema-title" className="md:text-xl font-normal mb-3">
          Preferencias de tema
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-t border-b py-3 border-gray-200 dark:border-gray-700">
          {opcionesTema.map((opcion) => {
            const seleccionado = theme === opcion.id;

            return (
              <button
                key={opcion.id}
                onClick={() => setTheme(opcion.id)}
                className={`rounded-xl overflow-hidden shadow-md transition-all duration-300 outline-none ring-0 border-2 cursor-pointer ${
                  seleccionado ? "border-blue-500" : "border-transparent"
                } focus-visible:ring-2 focus-visible:ring-blue-500`}
              >
                <div
                  className={`h-24 ${opcion.fondo} flex flex-col justify-between p-5 rounded-t-xl`}
                >
                  <div className="flex justify-between items-center">
                    <div
                      className={`w-1/3 h-3 rounded ${opcion.texto} bg-opacity-20 bg-current`}
                    />
                    <div
                      className={`w-5 h-5 rounded-full ${opcion.texto} bg-opacity-40 bg-current`}
                    />
                  </div>
                  <div
                    className={`w-2/3 h-2 mt-2 rounded ${opcion.texto} bg-opacity-20 bg-current`}
                  />
                </div>

                {/* Texto descriptivo */}
                <div className="px-4 py-2">
                  <h3 className="text-lg font-semibold mb-1">
                    {opcion.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-normal">
                    {opcion.descripcion}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </article>
    </section>
  );
}
