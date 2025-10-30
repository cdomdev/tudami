"use client";

import { ButtonDark } from "../components/buttons/Dark";
import { ButtonLight } from "../components/buttons/Light";
import { ButtonSystem } from "../components/buttons/System";
import { FormPrefenceContact } from "../components/forms/FormPrefenceContact";
import { InfoUser } from "../components/InfoUser";
import Link from "next/link";
import { Edit } from "lucide-react";
import { useSession } from "@/context/context.sesion";
import { DeleteAccount } from "../components/buttons/ButtonDeleteAccount";

export default function PreferenciasTema() {
  const { user } = useSession();

  return (
    <section className="space-y-2">
      <article className="p-6 dark:bg-custom-card  rounded-sm shadow-sm">
        <div className="flex justify-between items-center border-b">
          <h2
            id="info-profile-title"
            className="md:text-xl font-normal mb-3 text-accent-foreground"
          >
            Información de perfil
          </h2>
          <Link
            href={`/profile/account-setting/edit?id=${user?.id}`}
            className="text-accent-foreground hover:text-accent-foreground/80 "
          >
            <Edit />
            <span className="sr-only">button edit profile</span>
          </Link>
        </div>

        <InfoUser />
      </article>
      <article
        className="p-6 dark:bg-custom-card  rounded-sm shadow-sm  "
        role="region"
        aria-labelledby="opciones-tema-title"
      >
        <h2 id="opciones-tema-title" className="text-xl font-normal mb-3">
          Preferencias de tema
        </h2>

        <div className="grid space-y-4 place-content-center  sm:grid-cols-2 lg:grid-cols-3 border-t border-b py-4 border-gray-200 dark:border-gray-700 mx-auto">
          <ButtonLight />
          <ButtonDark />
          <ButtonSystem />
        </div>
      </article>

      <article
        className="p-6 dark:bg-custom-card  rounded-sm shadow-sm"
        role="region"
        aria-labelledby="preferencias-contacto-title"
      >
        <h3
          id="preferencias-contacto-title"
          className="text-xl border-b font-normal mb-3"
        >
          Preferencias de contacto
        </h3>

        <FormPrefenceContact />
      </article>
      <article
        className="p-6 dark:bg-custom-card  mb-10 border border-red-500 rounded-sm shadow-sm"
        role="region"
        aria-labelledby="zona-peligro-title"
      >
        <h3
          id="zona-peligro-title"
          className="md:text-xl border-b border-red-300 pb-2 mb-4 text-red-700 dark:text-red-300 font-semibold"
        >
          Zona de peligro
        </h3>

        <p className="text-sm text-red-600 dark:text-red-400 mb-4">
          Ten cuidado con las acciones dentro de esta sección. Pueden afectar de
          forma irreversible tu cuenta o datos.
        </p>

        <div className="flex gap-3">
          <DeleteAccount />
        </div>
      </article>
    </section>
  );
}
