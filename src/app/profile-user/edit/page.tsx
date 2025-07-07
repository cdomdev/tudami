import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function PageEditProfile() {
    return (
        <section className="bg-white dark:bg-slate-800  space-y-4 flex flex-col py-3 px-5 rounded-md shadow-md">
            <Link href="/profile-user/account-setting" className="group inline-flex items-center gap-1 px-3 py-2 rounded-md  text-base hover:bg-accent transition">
                <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
                <span>Volver</span>
            </Link>



            Esta aes la pagina para editar el perfil del usuario
        </section>
    )
}