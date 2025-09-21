import { query } from "@/lib/query";
import { SchemaResources } from "@/schemas";
import { supabase } from "@/utils/supabase/supabaseClient";

export async function saveResource(data: SchemaResources, isAdmin: boolean) {
  try {
    const url = `/api/admin/resources/new?isAdmin=${isAdmin}`;
    const res = await query(url, "POST", data);

    if (!res) {
      throw new Error("Error en el proceso de subida de los recursos");
    }

    return res;
  } catch (error) {
    console.log("Error en el proceso de subida de los recursos", error);
  }
}

export async function listDataResource(page: number, pageSize: number) {
  try {
    const url = `/api/resources/get?page=${page}&pageSize=${pageSize}`;
    const res = await query(url, "GET");

    if (!res) return new Error("Error en la solicitud de recursos");
    return res;
  } catch (error) {
    console.log("Error al listar los recursos", error);
  }
}

export async function listDataResourceBy(slug: string) {
  try {
    return await supabase
      .from("resources")
      .select("*, details_resources(*)")
      .eq("slug", slug).single();
  } catch (error) {
    console.log("Error al listar los recursos", error);
  }
}


export async function updateResource(data: SchemaResources, id?: number) {
  try {
    const url = `/api/admin/resources/put?id=${id}`;
    const res = await query(url, "PUT", data);
    if (!res) {
      throw new Error("Error en el proceso de subida de los recursos");
    }
    return res;
  } catch (error) {
    console.log("Error en el proceso de subida de los recursos", error);
  }
}