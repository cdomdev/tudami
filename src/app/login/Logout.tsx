"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/context/context.sesion";

export default function Logout() {
    const router = useRouter();
    const { clearUser } = useSession();

    async function signOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error al cerrar sesión:", error.message);
            return;
        }

        clearUser();
        router.push("/");
    }

    return (
        <button
            onClick={signOut}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Cerrar sesión
        </button>
    );
}
