"use client"


import { ButtonDark } from "../components/Dark";
import { ButtonLight } from "../components/Light";
import { ButtonSystem } from "../components/System";
import { FormPrefenceContact } from "../components/FormPrefenceContact";
import { InfoUser } from "../components/InfoUser";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useSession } from "@/context/context.sesion";


export default function PreferenciasTema() {

    const { user } = useSession();

    return (
        <section className="space-y-5">
            <article className="p-6 dark:bg-slate-800 bg-white rounded-md shadow-md">
                <div className="flex justify-between items-center border-b">
                    <h2 id="info-profile-title" className="md:text-xl font-normal mb-4 text-accent-foreground">
                        Información de perfil
                    </h2>
                    <Button className="" variant="ghost">
                        <Link href={`/profile-user/edit?id=${user?.id}`}>
                            <Edit />
                        </Link>
                        <span className="sr-only">button edit profile</span>
                    </Button>
                </div>

                <InfoUser />
            </article>
            <article
                className="p-6 dark:bg-slate-800 bg-white rounded-md shadow-md"
                role="region"
                aria-labelledby="opciones-tema-title"
            >
                <h2 id="opciones-tema-title" className="md:text-xl font-normal mb-3">
                    Preferencias de tema
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-b py-4 border-gray-200 dark:border-gray-700">
                    <ButtonLight />
                    <ButtonDark />
                    <ButtonSystem />
                </div>
            </article>

            <article
                className="p-6 dark:bg-slate-800 bg-white rounded-md shadow-md"
                role="region"
                aria-labelledby="opciones-tema-title"
            >
                <h3 id="opciones-tema-title" className="md:text-xl border-b font-normal mb-3">
                    Preferencias de contacto
                </h3>

                <FormPrefenceContact />
            </article>
            <article
                className="p-6 dark:bg-slate-800 bg-white border border-red-500 rounded-md shadow-md"
                role="region"
                aria-labelledby="opciones-tema-title"
            >
                <h3 id="opciones-tema-title" className="md:text-xl border-b border-red-300 pb-2 mb-4 text-red-700 dark:text-red-300 font-semibold">
                    Zona de peligro
                </h3>

                <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    Ten cuidado con las acciones dentro de esta sección. Pueden afectar de forma irreversible tu cuenta o datos.
                </p>

                <div className="flex gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg">
                        Solicito eliminar mi cuenta
                    </button>

                </div>
            </article>

        </section>
    );
}


