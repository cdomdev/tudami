import { SupabaseClient } from "@supabase/supabase-js";

const ADMIN_ROLES = ["admin_tudami", "superadmin", "moderator", "admin1"];

export async function requireAdmin(supabase: SupabaseClient) {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw new Error("No se pudo obtener la session");

    if (!user || !user.id) throw new Error("No autenticado");

    // Obtener role_id del usuario desde la tabla `users`
    const { data: userData, error: qError } = await supabase
      .from("users")
      .select("rol_id")
      .eq("id", user.id)
      .single();

    if (qError) throw new Error("No se pudo obtener el rol_id del usuario");

    const roleId = (userData as { rol_id?: string | number } | null)?.rol_id;

    if (roleId === undefined || roleId === null) {
      // Si no hay rol_id, no está autorizado
      throw new Error("No autorizado");
    }

    // Resolver role desde tabla `roles` usando el role_id (preferir `key` como identificador estable)
    const { data: roleData, error: roleError } = await supabase
      .from("roles")
      .select("rol_name, key")
      .eq("id", roleId)
      .single();

    if (roleError || !roleData) {
      throw new Error("No se pudo resolver el rol del usuario");
    }

    const roleKey =
      (roleData as { key?: string; name?: string } | null)?.key ??
      (roleData as { key?: string; name?: string } | null)?.name;

    const role =
      typeof roleKey === "string" ? roleKey.toLowerCase() : undefined;

    if (!role || !ADMIN_ROLES.includes(role)) {
      throw new Error("No autorizado");
    }

    return true;
  } catch (error) {
    // Re-lanzar para que la ruta lo capture y devuelva 403/401
    throw error;
  }
}
