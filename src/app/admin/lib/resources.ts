import { query } from "@/lib/query";
import { SchemaResources } from "@/schemas";

export async function saveResource(data: SchemaResources) {
  try {
    const url = "/api/admin/resources/new";
    const res = await query(url, "POST", data);

    if (!res) {
      throw new Error("Error en el proceso de subida de los recursos");
    }

    return res;
  } catch (error) {
    console.log("Error en el proceso de subida de los recursos", error);
  }
}

export async function listDataResorce(page: number, pageSize: number) {
  try {
    const url = `/api/resources/get?page=${page}&pageSize=${pageSize}`;
    const res = await query(url, "GET");

    if (!res) return new Error("Error en la solicitud de recursos");
    return res;
  } catch (error) {
    console.log("Error al listar los recursos", error);
  }
}
