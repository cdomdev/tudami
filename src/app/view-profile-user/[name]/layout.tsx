"use client";

import { useEffect, useState } from "react";
import { getDataProfilePublic } from "../lib/getDataProfile";
import { useSearchParams } from "next/navigation";
import { ProfileSkeleton } from "../components/ProfileSkeleton";
import { ProfileNotAvailable } from "../components/ProfileNotAvailable";
import { SchemaProfileResponse } from "../schema/schemaResponse";
import { HeaderProfile } from "../components/HeaderProfile";
import { WhatSappIcon } from "@/components/icons/WhatSappIcon";
import { Button } from "@/components/ui/button";
import { Clipboard, Mail } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [dataProfile, setDataProfile] = useState<SchemaProfileResponse>();

  const searchParams = useSearchParams();
  const userId = searchParams.get("u_view_profile_p");
  const approval = searchParams.get("aprov");

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
    const whatsappUrl = `https://wa.me/+57${dataProfile.phone.replace(
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
    window.location.href = emailUrl;
  };

  const notContactAvailable = !dataProfile.phone && !dataProfile.email;

  const listItems = [
    { name: "Resumen", href: `/view-profile-user/${dataProfile.full_name}?u_view_profile_p=${userId}&aprov=${approval}` },
    {
      name: "Preguntas",
      href: `/view-profile-user/${dataProfile.full_name}/summary?q=questions&u_view_profile_p=${userId}&aprov=${approval}`,
    },
    {
      name: "Respuestas",
      href: `/view-profile-user/${dataProfile.full_name}/summary?q=answers&u_view_profile_p=${userId}&aprov=${approval}`,
    },
    {
      name: "Etiquetas",
      href: `/view-profile-user/${dataProfile.full_name}/summary?q=tags&u_view_profile_p=${userId}&aprov=${approval}`,
    },
  ];
  return (
    <>
      <HeaderProfile {...dataProfile} />
      <section className="overflow-hidden ">
        {/* Header con avatar y datos básicos */}
        <div className="px-6 py-4 space-y-4 border-b border-slate-200 dark:border-slate-700">
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
                  Haz clic para copiar el correo electrónico 0 sobre el botón de
                  enviar correo electrónico.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="mt-3 grid grid-cols-1 md:flex px-6 py-4 gap-6">
        <aside className="min-w-28 ">
          <ul className="flex md:flex-col ">
            {listItems.map((item) => (
              <li key={item.name} className="">
                <Link
                  href={item.href}
                  className="block px-4 py-1 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-md"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="border-l w-full p-2">{children}</main>
      </section>
    </>
  );
}
