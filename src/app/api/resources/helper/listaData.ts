import { SupabaseClient } from "@supabase/supabase-js";

export async function listaAllDataResource(
  supabase: SupabaseClient,
  page = 1,
  pageSize = 10
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("resources")
    .select("*,details_resources(*)", { count: 'exact' })
    .range(from, to);

  if (!data || error)
    return {
      error: error,
      message: "Error en el helper del listado de recusos",
    };

  return { data, total: count };
}


