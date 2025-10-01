import { query } from "@/lib/query"
import { SchemaNews } from "@/schemas"

export async function saveNews(data: SchemaNews) {
    try {
        const res = await query("/api/admin/news/add", "POST", {
            data
        })
        
        if (!res || !res.ok) throw new Error("Error al guardar la informacion de la noticia")

        return { succes: true, message: "Nueva noticia agrega con exito" };

    } catch (error) {
        console.error("Erro al guardar la informacion de la noticia", error)
    }
}