import { SupabaseClient } from "@supabase/supabase-js";
import { UserSchema } from "@/schemas";

export async function getUsersHelper(
  supabase: SupabaseClient,
  page = 1,
  pageSize = 10
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("users")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) {
    throw new Error("Error al obtener usuarios", { cause: error });
  }

  return { data: data ?? ([] as UserSchema[]), total: count };
}


export async function getUserByIdHelper(
  supabase: SupabaseClient,
  id: string
) {
  if (!id) throw new Error("El id es requerido");

  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();

  if (error) {
    throw new Error("Error al obtener el usuario", { cause: error });
  }

  return data as UserSchema;
}

export async function updateUserHelper(
  supabase: SupabaseClient,
  id: string,
  payload: Partial<UserSchema> | Record<string, unknown>
) {
  if (!id) throw new Error("El id es requerido");

  // Normalizar payload: convertir `phone` a número si viene como string
  const processedPayload: Record<string, unknown> = { ...payload };

  if (processedPayload.phone !== undefined && processedPayload.phone !== null) {
    const rawPhone = processedPayload.phone;
    let phoneNumber: number | undefined;

    if (typeof rawPhone === "string") {
      const digits = rawPhone.replace(/\D/g, "");
      phoneNumber = digits.length > 0 ? Number(digits) : undefined;
    } else if (typeof rawPhone === "number") {
      phoneNumber = rawPhone;
    }

    if (phoneNumber === undefined) {
      // Eliminar campo si no es válido
      delete processedPayload.phone;
    } else if (Number.isNaN(phoneNumber)) {
      throw new Error("El teléfono no es válido");
    } else {
      processedPayload.phone = phoneNumber;
    }
  }

  const { error } = await supabase.from("users").update(processedPayload).eq("id", id);

  if (error) {
    throw new Error("Error al actualizar el usuario", { cause: error });
  }

  return { success: true, message: "Usuario actualizado con éxito" };
}

export async function deleteUserHelper(
  supabase: SupabaseClient,
  id: string
) {
  if (!id) throw new Error("El id es requerido");

  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) {
    throw new Error("Error al eliminar el usuario", { cause: error });
  }

  return { success: true, message: "Usuario eliminado con éxito" };
}
