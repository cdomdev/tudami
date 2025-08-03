"use client";

import { BarraReputacion } from "./components/BarraDeReputacion";
import { obtenerProgresoReputacion } from "./utils/reputacion";
import { CardsCounts } from "./components/cards/CardActivity";
import { CardReputaction } from "./components/cards/CardsReputation";
import { useSession } from "@/context/context.sesion";
import { getAchievementByuser } from "@/utils/mapAchienvements"
import { CardAchievement } from "@/components/ui/Cards/CardAchievements";

export default function Home() {
  const { user } = useSession();


  console.log("datos del usuario en profile -->", user)
  
  const score = user?.reputation?.score ? parseInt(user?.reputation?.score) : 0;
  const achievements = user?.achievements || [];

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
  
  const progresoReputacion = obtenerProgresoReputacion(score);
  const insigniasObtenidas = getAchievementByuser(achievements ?? []);
  console.log("datos del logros en el perfil propio ---[PROFIle]",  insigniasObtenidas)

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
        <BarraReputacion puntos={score} />
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
          {achievements && achievements.map((achievement, index) => (
            <CardAchievement
              key={index}
              title={achievement.title}
              description={achievement.description}
              icon={achievement.icon}
              color={achievement.color}
            />
          ))}
        </div>
      </article>
    </section>
  );
}
