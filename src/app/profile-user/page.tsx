"use client";

import { BarraReputacion } from "./components/BarraDeReputacion";
import { CardInsignia } from "./components/cards/CardInsignia";
import { obtenerProgresoReputacion } from "./utils/reputacion";
import { obtenerInsigniasUsuario } from "./utils/mapearInsignias";
import { CardsCounts } from "./components/cards/CardActivity";
import { CardReputaction } from "./components/cards/CardsReputation";
import { useSession } from "@/context/context.sesion";

export default function UserProfile() {
  const { user } = useSession();

  const estadisticas = {
    puntos: 10,
    insignias: [
      { badge: "cuenta_creada" },
      { badge: "primera_pregunta" },
      { badge: "primera_respuesta" },
    ],
  };

  const itemsActivity = [
    {
      title: "Preguntas hechas",
      count: user?.reputation?.questions,
      icon: "i-heroicons-question-mark-circle-solid",
    },
    {
      title: "Respuestas dadas",
      count: user?.reputation?.responses,
      icon: "i-heroicons-chat-bubble-left-right-solid",
    },
  ];
  const progresoReputacion = obtenerProgresoReputacion(estadisticas.puntos);
  const insigniasObtenidas = obtenerInsigniasUsuario(estadisticas.insignias);

  return (
    <section className="space-y-5">
      {/* Estadísticas */}
      <article
        className="p-6 dark:bg-custom-card  rounded-sm shadow-sm"
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
          {itemsActivity.map((item, index) => (
            <CardsCounts key={index} counter={item.count} text={item.title} />
          ))}
          <CardReputaction progresoReputacion={progresoReputacion} />
        </div>
      </article>

      {/* Insignias */}
      <article
        className="p-6  dark:bg-custom-card rounded-sm shadow-sm"
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
