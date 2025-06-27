"use client";

import { BarraReputacion } from "./components/BarraDeReputacion";
import { CardInsignia } from "./components/CardInsignia";
import { obtenerProgresoReputacion, getColorByLevel } from "./utils/reputacion";
import { obtenerInsigniasUsuario } from "./utils/mapearInsignias";
import Image from "next/image";

export default function UserProfile() {
  const estadisticas = {
    preguntasHechas: 12,
    respuestasDadas: 8,
    puntos: 200,
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
        <h2
          id="estadisticas-title"
          className="text-lg md:text-xl font-normal mb-2"
        >
          Tu actividad
        </h2>
        <BarraReputacion puntos={estadisticas.puntos} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="rounded-xl p-5 text-white shadow-sm hover:scale-[1.02] transition bg-gradient-to-tl z-0 overflow-hidden relative  before:absolute before:w-full before:aspect-square before:left-0 before:top-0 before:rounded-full before:blur-3xl before:opacity-80 before:-z-10 before:transition from-[rgba(163,166,228,0.7)] to-[rgba(107,22,185,0.7)] before:[background-image:radial-gradient(circle,_rgba(145,70,255)_0,_rgba(13,16,35,0.4)_100%)] dark:from-[rgba(32,35,91,0.7)] dark:to-[rgba(7,9,33,0.7)] dark:before:[background-image:radial-gradient(circle,_rgba(145,70,255)_0,_rgba(13,16,35,0.4)_100%)]">
            <p className="text-xl md:text-4xl font-bold text-center">
              {estadisticas.preguntasHechas}
            </p>
            <p className="mt-2 text-sm opacity-90  text-center">Preguntas hechas</p>
          </div>

          <div className="rounded-xl p-5 text-white shadow-sm hover:scale-[1.02] transition bg-gradient-to-tl z-0 overflow-hidden relative  before:absolute before:w-full before:aspect-square before:left-0 before:top-0 before:rounded-full before:blur-3xl before:opacity-80 before:-z-10 before:transition from-[rgba(163,166,228,0.7)] to-[rgba(107,22,185,0.7)] before:[background-image:radial-gradient(circle,_rgba(145,70,255)_0,_rgba(13,16,35,0.4)_100%)] dark:from-[rgba(32,35,91,0.7)] dark:to-[rgba(7,9,33,0.7)] dark:before:[background-image:radial-gradient(circle,_rgba(145,70,255)_0,_rgba(13,16,35,0.4)_100%)]">
            <p className="text-xl md:text-4xl font-bold text-center">
              {estadisticas.respuestasDadas}
            </p>
            <p className="mt-2 text-sm opacity-90 text-center">Respuestas dadas</p>
          </div>

          <div
            className="rounded-xl p-5 text-center shadow-sm transition hover:scale-[1.02] relative overflow-hidden z-0 "
            style={{
              background: `linear-gradient(to top, ${getColorByLevel(
                progresoReputacion.actual.nombre
              )})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/5 to-transparent opacity-30 z-[-1] "></div>
            <div className="bg-white shadow-sm backdrop-blur-sm flex px-3 py-1 items-center justify-center gap-2 rounded-lg">
              <p className="inline-block px-4 py-1 border backdrop-blur-sm bg-gradient-to-bl from-indigo-500 to-sky-400 text-transparent bg-clip-text rounded-full text-sm font-semibold shadow-inner">
                {progresoReputacion.actual.nombre}
              </p>
              <Image
                src={progresoReputacion.actual.image || "/principiante.svg"}
                width={45}
                height={45}
                alt={
                  progresoReputacion.actual.imageAlt || "Nivel de principiante"
                }
              />
            </div>
            <p className="mt-3 text-sm text-white font-medium">
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
        <h3
          id="insignias-title"
          className="text-lg md:text-xl font-normal mb-3"
        >
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
