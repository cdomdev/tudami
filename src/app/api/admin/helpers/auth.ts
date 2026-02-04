import { SupabaseClient } from "@supabase/supabase-js";

const ADMIN_ROLES = ["admin", "superadmin", "moderator"];

export async function requireAdmin(supabase: SupabaseClient) {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw new Error("No se pudo obtener la session");

    if (!user || !user.id) throw new Error("No autenticado");

    // Obtener role del usuario desde tabla users
    const { data, error: qError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (qError) throw new Error("No se pudo obtener el rol del usuario");

    const role = (data as { role?: string } | null)?.role;

    if (!role || !ADMIN_ROLES.includes(role)) {
      throw new Error("No autorizado");
    }

    return true;
  } catch (error) {
    // Re-lanzar para que la ruta lo capture y devuelva 403/401
    throw error;
  }
}