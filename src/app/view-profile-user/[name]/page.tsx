"use client";

import { useSearchParams } from "next/dist/client/components/navigation";
import { SchemaProfileResponse } from "@/schemas";
import { useEffect, useState } from "react";
import { MessageSquare, Reply } from "lucide-react";
import { getDataProfilePublic } from "../lib/getDataProfile";
import { SkeletonActividadUsuario } from "../components/SkeletonActivitieUser";
import { getAchievementByuser } from "@/utils/mapAchienvements";
import { CardAchievement } from "@/components/ui/Cards/CardAchievements";

export default function ViewProfileUserPage() {
  const [dataProfile, setDataProfile] = useState<SchemaProfileResponse>();
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const userId = searchParams.get("u_view_profile_p");
  const achievements = dataProfile?.user_achievements ?? [];

  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        setLoading(false);
        return;
      }

      const res = await getDataProfilePublic({ userId });

      if (res.success && res.data) {
        setDataProfile(res.data);
      }

      setLoading(false);
    }

    fetchData();
  }, [userId]);

  const achievementsObtained = getAchievementByuser(achievements);

  if (loading) {
    <SkeletonActividadUsuario />;
  }

  return (
    <>
      <h2 className="text-lg font-semibold  text-slate-800 dark:text-white">
        Actividad de {dataProfile?.full_name}
      </h2>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 grid-rows-1 sm:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center p-2 rounded-sm bg-slate-50 dark:bg-slate-800 shadow-sm">
            <p className="text-xl flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
              <MessageSquare className="w-5 h-5 text-indigo-500 " />
              {dataProfile?.questions[0]?.count ?? 0}
            </p>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
              Preguntas
            </p>
          </div>

          <div className="flex  flex-col items-center p-2 rounded-sm bg-slate-50 dark:bg-slate-800 shadow-sm">
            <p className="text-xl flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
              <Reply className="w-5 h-5 text-indigo-500" />
              {dataProfile?.question_comments[0]?.count ?? 0}
            </p>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
              Respuestas
            </p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
          Insignias obtenidas
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 overflow-x-auto  mx-auto overflow-y-hidden ">
          {achievementsObtained &&
            achievementsObtained.map((achievement, index) => (
              <CardAchievement
                key={index}
                title={achievement.title}
                description={achievement.description}
                icon={achievement.icon}
                color={achievement.color}
              />
            ))}
        </div>
      </div>
    </>
  );
}
