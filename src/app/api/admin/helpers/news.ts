import { SupabaseClient } from "@supabase/supabase-js";
import { SchemaResources } from "@/schemas"

export async function savaDataNewHelper(supabase: SupabaseClient, data: SchemaResources) {
    const { data: resData, error } = await supabase.from("news").insert(data)
    if (error) {
        throw new Error("Error al guardar los datos de las noticias")
    }

    return resData

}