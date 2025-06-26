"use client";

import { BarraReputacion } from "./components/BarraDeReputacion";
import { CardInsignia } from "./components/CardInsignia";
import { obtenerProgresoReputacion } from "./utils/reputacion";
import { obtenerInsigniasUsuario } from "./utils/mapearInsignias";

export default function UserProfile() {
  const estadisticas = {
    preguntasHechas: 12,
    respuestasDadas: 8,
    puntos: 60,
    insignias: [
      { badge: "cuenta_creada" },
      { badge: "primera_pregunta" },
      { badge: "primera_respuesta" },
    ],
  };

  const progresoReputacion = obtenerProgresoReputacion(estadisticas.puntos);
  const insigniasObtenidas = obtenerInsigniasUsuario(estadisticas.insignias);

  return (
    <section className="space-y-10">
      {/* Estadísticas */}
      <article
        className="p-6 dark:bg-slate-800 bg-white rounded-2xl shadow-sm"
        role="region"
        aria-labelledby="estadisticas-title"
      >
        <h2 id="estadisticas-title" className="text-lg md:text-xl font-normal mb-2">
          Tu actividad
        </h2>
        <BarraReputacion puntos={estadisticas.puntos} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-xl bg-gradient-to-r from-sky-500 to-sky-400 p-5 text-white shadow-sm hover:scale-[1.02] transition">
            <p className="text-xl md:text-4xl font-bold">{estadisticas.preguntasHechas}</p>
            <p className="mt-2 text-sm opacity-90">Preguntas hechas</p>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-green-500 to-green-400 p-5 text-white shadow-sm hover:scale-[1.02] transition">
            <p className="text-xl md:text-4xl font-bold">{estadisticas.respuestasDadas}</p>
            <p className="mt-2 text-sm opacity-90">Respuestas dadas</p>
          </div>

          <div
            className="rounded-xl border-2 p-5 text-center shadow-sm transition hover:scale-[1.02]"
            style={{
              borderColor: progresoReputacion.actual.color
                .replace("bg-", "")
                .replace("-", ""),
            }}
          >
            <p
              className={`inline-block px-4 py-1 text-white rounded-full text-sm font-semibold ${progresoReputacion.actual.color}`}
            >
              {progresoReputacion.actual.nombre}
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Nivel de reputación
            </p>
          </div>
        </div>
      </article>

      {/* Insignias */}
      <article
        className="p-6 dark:bg-slate-800 bg-white rounded-2xl shadow-sm"
        role="region"
        aria-labelledby="insignias-title"
      >
        <h3 id="insignias-title" className="text-lg md:text-xl font-normal mb-3">
          Tus insignias
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto  mx-auto overflow-y-hidden p-3">
          {insigniasObtenidas.map((insignia, index) => (
            <CardInsignia
              key={index}
              titulo={insignia.titulo}
              descripcion={insignia.descripcion}
              icono={insignia.icono}
              gradiente={insignia.color}
            />
          ))}
        </div>
      </article>
    </section>
  );
}
