"use client";

import { useSearchParams } from "next/navigation";
import { Clipboard, Mail, MessageSquare, Reply } from "lucide-react";
import { HeaderProfile } from "../components/HeaderProfile";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import { useEffect, useState } from "react";
import { getDataProfilePublic } from "../lib/getDataProfile";
import { SchemaProfileResponse } from "../schema/schemaResponse";
import { WhatSappIcon } from "@/components/icons/WhatSappIcon";
import { ProfileNotAvailable } from "../components/ProfileNotAvailable";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ViewProfileUserPage() {
  const [loading, setLoading] = useState(true);
  const [dataProfile, setDataProfile] = useState<SchemaProfileResponse>();

  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");

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

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (!dataProfile) {
    return <ProfileNotAvailable />;
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
  const handleCopyEmailContact = async () => {
    if (!dataProfile.email) return;

    try {
      await navigator.clipboard.writeText(dataProfile.email);
      toast.success("Correo copiado al portapapeles");
    } catch (error) {
      console.error("Error al copiar:", error);
      toast.error("No se pudo copiar el correo");
    }
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

  const notContactAvailable = !dataProfile.phone && !dataProfile.email;

  return (
    <>
      <HeaderProfile {...dataProfile} />
      <section className="max-w-5xl mx-auto  overflow-hidden ">
        {/* Header con avatar y datos básicos */}
        <div className="px-6 py-4 space-y-4 dark:bg-custom-card rounded-sm shadow-sm ">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Contacto
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            {notContactAvailable
              ? "Este usuario no ha proporcionado información de contacto."
              : "Este usuario permite que te comuniques a través de los siguientes medios disponibles:"}
          </p>

          <div className="flex flex-col gap-3 ">
            {dataProfile.phone && (
              <button
                onClick={handleWhatsAppContact}
                className="inline-flex cursor-pointer transition duration-200 items-center gap-2 w-50 justify-center bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-2 px-3 rounded-md"
              >
                <WhatSappIcon className="w-4 h-4" />
                WhatsApp
              </button>
            )}

            {dataProfile.email && (
              <div className="flex flex-col items-start ">
                <div className="flex items-center gap-2">
                  <Button
                    className="flex cursor-pointer transition duration-200 text-muted-foreground dark:bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-300 dark:hover:text-black"
                    variant="outline"
                    onClick={handleCopyEmailContact}
                  >
                    <span className="truncate">{dataProfile.email}</span>
                    <Clipboard className="w-4 h-4 text-slate-500" />
                  </Button>

                  <Button
                    className="cursor-pointer"
                    onClick={handleEmailContact}
                  >
                    <Mail className="w-4 h-4" />
                    <span className="sr-only">Enviar correo electrónico</span>
                  </Button>
                </div>
                <span className="text-[11px] mt-1 text-slate-500 dark:text-slate-400">
                  {" "}
                  Haz clic para copiar el correo electrónico.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stats y bio */}
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white">
            Actividad de {dataProfile.full_name}
          </h3>
          <div className="grid grid-cols-2 grid-rows-1 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center p-2 rounded-sm bg-slate-50 dark:bg-slate-800 shadow-sm">
              <p className="text-xl flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
                <MessageSquare className="w-5 h-5 text-indigo-500 " />
                {dataProfile.questions[0]?.count ?? 0}
              </p>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
                Preguntas
              </p>
            </div>

            <div className="flex  flex-col items-center p-2 rounded-sm bg-slate-50 dark:bg-slate-800 shadow-sm">
              <p className="text-xl flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
                <Reply className="w-5 h-5 text-indigo-500" />
                {dataProfile.question_comments[0]?.count ?? 0}
              </p>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">
                Respuestas
              </p>
            </div>
          </div>

          {/* Acciones */}
        </div>
      </section>

      <section className="max-w-5xl mx-auto  overflow-hidden grid grid-cols-1 sm:grid-cols-6  gap-6 p-6">
        {/* Actividad */}
        <div className="md:col-span-4 p-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Preguntas realizadas por {dataProfile.full_name}
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 border-indigo-500 pl-4">
              <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">
                Hace 2 días
              </p>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Respondió a: &ldquo;¿Cómo implementar autenticación en
                React?&rdquo;
              </p>
            </div>
            {/* Aquí puedes mapear la actividad real */}
          </div>
        </div>

        <div className="md:col-span-2 p-6 border-l border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-white flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Etiquetas más usadas por {dataProfile.full_name}
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 border-indigo-500 pl-4">
              <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">
                Hace 2 días
              </p>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                Respondió a: &ldquo;¿Cómo implementar autenticación en
                React?&rdquo;
              </p>
            </div>
            {/* Aquí puedes mapear la actividad real */}
          </div>
        </div>
      </section>
    </>
  );
}
