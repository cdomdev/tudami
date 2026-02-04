import { SupabaseClient } from "@supabase/supabase-js";
import { SchemaNews } from "@/schemas";

// Guardar datos de noticias en db
export async function savaDataNewHelper(
  supabase: SupabaseClient,
  data: SchemaNews
) {
  
  console.log("Data recibida en helper:", data);

  const slug = data.title
    ? data.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "")
    : "";

  const formatedData = {
    title: data.title || "",
    slug: slug,
    sub_title: data.sub_title || "",
    description: data.description || "",
    image: data.image || "",
    source: data.source || "",
    url_source: data.url_source || "",
  };
  const { error } = await supabase.from("news").insert(formatedData);
  if (error) {
    throw new Error("Error al guardar los datos de las noticias");
  }

  return { success: true, message: "Noticia agregada con exito" };
}

// get
export async function getNews(
  supabase: SupabaseClient,
  page = 1,
  pageSize = 10
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await supabase
    .from("news")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) {
    throw new Error("Error al obtener noticias", { cause: error });
  }

  return { data, total: count };
}

// delete
export async function deleteNewHelper(supabase: SupabaseClient, id: number) {
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) {
    throw new Error("Error al eliminar la noticia", { cause: error });
  }
  
  return { success: true, message: "Noticia eliminada con exito" };
}

export async function getNewBySlugHelper(
  supabase: SupabaseClient,
  slug: string
) {
  if (!slug || typeof slug !== "string") {
    throw new Error("Slug inválido", { cause: "Slug es requerido" });
  }
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    throw new Error("Error al obtener la noticia", { cause: error });
  }
  return data;
}
