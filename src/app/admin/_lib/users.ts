import { query } from "@/lib/query";
import { UserSchema } from "@/schemas";

/**
 * List users with pagination
 * @param page page number (defaults to 1)
 * @param pageSize items per page (defaults to 10)
 */
export async function listUsers(page = 1, pageSize = 10) {
  try {
    const url = `/api/admin/users/get/list?page=${page}&pageSize=${pageSize}`;
    const res = await query(url, "GET");

    if (!res) throw new Error("Error al obtener la lista de usuarios");
    return res;
  } catch (error) {
    console.error("Error al listar usuarios:", error);
    return { success: false, message: "Error al obtener la lista de usuarios" };
  }
}

/**
 * Get a single user by id
 * @param id user id
 */
export async function getUserById(id?: string) {
  try {
    if (!id) throw new Error("El id de usuario es requerido");

    const url = `/api/admin/users/get?id=${encodeURIComponent(id)}`;
    const res = await query(url, "GET");

    if (!res) throw new Error("Error al obtener la informacion del usuario");
    return res as UserSchema;
  } catch (error) {
    console.error("Error al obtener usuario por id:", error);
    return { success: false, message: "Error al obtener la informacion del usuario" };
  }
}

/**
 * Update user by id
 * @param id user id
 * @param data partial user payload
 */
export async function updateUser(id?: string, data?: Partial<UserSchema>) {
  try {
    if (!id) throw new Error("El id de usuario es requerido");

    const url = `/api/admin/users/put?id=${encodeURIComponent(id)}`;
    const res = await query(url, "PUT", data);

    if (!res) throw new Error("Error al actualizar usuario");
    return { success: true, message: "Usuario actualizado con éxito" };
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return { success: false, message: "Error al actualizar usuario" };
  }
}

/**
 * Delete user by id
 * @param id user id
 */
export async function deleteUser(id?: string) {
  try {
    if (!id) throw new Error("El id de usuario es requerido");

    const url = `/api/admin/users/delete?id=${encodeURIComponent(id)}`;
    const res = await query(url, "DELETE");

    if (!res) throw new Error("Error al eliminar usuario");
    return { success: true, message: "Usuario eliminado con éxito" };
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    return { success: false, message: "Error al eliminar usuario" };
  }
}