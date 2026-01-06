import { supabase } from "@/utils/supabase/supabaseClient";

export async function listaAllDataResourceClient(
  page = 1,
  pageSize = 10,
  category: string,
  type?: string
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("resources")
    .select("*, details_resources(*)")
    .eq("category", category)
    .range(from, to)
    .eq("status", "approved")
    .order("created_at", { ascending: false });;

  if (type) {
    query = query.eq("type", type);
  }

  return query;
}
