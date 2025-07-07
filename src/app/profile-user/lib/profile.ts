import { supabase } from "@/lib/supabase";

export async function getDataUserBy(user_id: string) {
    const { data, error } = await supabase.from("users").select("*").eq("id", user_id).single()

    if (error) {
        console.error("Error al obtener los datos del usuario:", error.message);
        return [];
    }

    return { info: data };

}