import { supabase } from "@/utils/supabase/supabaseClient";

export async function logout() {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!res.ok) {
      console.error("Error al cerrar sesión en el servidor");
      return;
    }

    // cerrar sesion en supabase
    await supabase.auth.signOut();


  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}
