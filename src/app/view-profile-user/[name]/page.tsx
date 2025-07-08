"use client";

import { useSearchParams } from "next/navigation";
import { MessageCircle, Mail} from "lucide-react";
import { HeaderProfile } from "../components/HeaderProfile";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import { useEffect, useState } from "react";
import { getDataProfilePublic } from "../lib/getDataProfile";
import { SchemaProfileResponse } from "../schema/schemaResponse";
import { WhatSappIcon } from "@/components/icons/WhatSappIcon";

export default function ViewProfileUserPage() {
  const [loading, setLoading] = useState(true);
  const [dataProfile, setDataProfile] = useState<SchemaProfileResponse | null>(
    null
  );

  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

  useEffect(() => {
    async function fetchData() {
      if (!userId) {
        setLoading(false);
        return;
      }

      const { data, success } = await getDataProfilePublic({ userId });

      if (success && data) {
        setDataProfile(data);
      }

      setLoading(false);
    }

    fetchData();
  }, [userId]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  console.log("Profile data:", dataProfile);

  if (!dataProfile) {
    return (
      <div className="max-w-2xl mx-auto text-center mt-30 text-gray-600 dark:text-gray-300">
        Este perfil no está disponible o no es público.
      </div>
    );
  }

  const handleWhatsAppContact = () => {
    if (!dataProfile.phone) return;
    const message = encodeURIComponent(
      `Hola ${dataProfile.full_name}, vi tu perfil en Tudami y me gustaría contactarte.`
    );
    const whatsappUrl = `https://wa.me/${dataProfile.phone.replace(
      /\D/g,
      ""
    )}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailContact = () => {
    if (!dataProfile.email) return;
    const subject = encodeURIComponent("Contacto desde Tudami");
    const body = encodeURIComponent(
      `Hola ${dataProfile.full_name},\n\nVi tu perfil en Tudami y me gustaría contactarte.\n\nSaludos.`
    );
    const emailUrl = `mailto:${dataProfile.email}?subject=${subject}&body=${body}`;
    window.open(emailUrl, "_blank");
  };

  return (
    <>
      <section className="max-w-5xl mx-auto p-6 mt-10">
        <HeaderProfile {...dataProfile} />
      </section>
      <section className="max-w-5xl mx-auto dark:bg-slate-800 mb-8 shadow-sm overflow-hidden bg-accent p-4  rounded-sm">
        <div className="pb-8 space-y-6 ">
          <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
              Sobre {dataProfile.full_name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {dataProfile.bio || "Este usuario no ha añadido una biografía."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {dataProfile.questions[0]?.count ?? 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Preguntas
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {dataProfile.question_comments[0]?.count ?? 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Respuestas
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {dataProfile.phone && (
              <button
                onClick={handleWhatsAppContact}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 cursor-pointer"
              >
               <WhatSappIcon className="w-5 h-5" />
                <span>Contactar por WhatsApp</span>
              </button>
            )}
            {dataProfile.email && (
              <button
                onClick={handleEmailContact}
                className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Contactar por Gmail</span>
              </button>
            )}
          </div>
        </div>
      </section>
      <section className="max-w-5xl mx-auto p-6 bg-white dark:bg-slate-800 shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold flex items-center text-gray-900 dark:text-white">
            <MessageCircle className="w-5 h-5 mr-2" />
            Actividad Reciente
          </h2>
        </div>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-300 dark:border-blue-600 pl-4 py-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hace 2 días
            </p>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Respondió a: &ldquo;¿Cómo implementar autenticación en
              React?&rdquo;
            </p>
          </div>
          {/* Aquí podrías mapear actividad real en el futuro */}
        </div>
      </section>
    </>
  );
}
