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

export async function deleteNews(id?: number) {
  try {
    const url = `/api/admin/news/delete?id=${id}`;
    const res = await query(url, "DELETE");

    if (!res) throw new Error("Error al eliminar la noticia");
    return { success: true, message: "Noticia eliminada con éxito" };
  } catch (error) {
    console.error("Error al eliminar la noticia", error);
    return { success: false, message: "Error al eliminar la noticia" };
  }
}

export async function listDataNews(page = 1, pageSize = 10) {
  try {
    const url = `/api/admin/news/get/list?page=${page}&pageSize=${pageSize}`;
    const res = await query(url, "GET");
    if (!res) throw new Error("Error al obtener las noticias");
    return res;
  } catch (error) {
    console.error("Error al obtener las noticias", error);
  }
}

export async function listDataNewsBy(slug: string) {
  try {
    const url = `/api/admin/news/get/by?slug=${slug}`;
    const res = await query(url, "GET");
    if (!res) throw new Error("Error al obtener la noticia");
    return res;
  } catch (error) {
    console.error("Error al obtener la noticia", error);
  }
}
