import { query } from "@/lib/query";
import { SchemaNews } from "@/schemas";

export async function saveNews(data: SchemaNews) {
  try {
    const res = await query("/api/admin/news/add", "POST", {
      data,
    });

    if (!res) throw new Error("Error al guardar la informacion de la noticia");

    return { success: true, message: "Nueva noticia agrega con exito" };
  } catch (error) {
    console.error("Erro al guardar la informacion de la noticia", error);
  }
}

export async function listDataNews(page: number, pageSize: number) {
  try {
    const res = await query(
      `/api/admin/news/list?page=${page}&pageSize=${pageSize}`,
      "GET"
    );
    if (!res) throw new Error("Error al listar las noticias");
    return res;
  } catch (error) {
    console.error("Error al listar las noticias", error);
    return [];
  }
}
