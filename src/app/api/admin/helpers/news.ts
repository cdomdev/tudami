import { SupabaseClient } from "@supabase/supabase-js";
import { SchemaNews } from "@/schemas";

export async function savaDataNewHelper(
  supabase: SupabaseClient,
  data: SchemaNews
) {
  const formatedData = {
    title: data.title || "",
    slug: data.title
      ? data.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\-]/g, "")
      : "",
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
