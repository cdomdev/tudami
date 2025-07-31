import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "KEYS no configuradas en el cliente de Supabase: NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}
/*
 * Cliente de Supabase con token de cookie para uso general desde las rutas de servidor
 */
export async function supabaseServerClient() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sb-access-token")?.value;
  // const refreshToken = cookieStore.get("sb-refresh-token")?.value;

  if (!sessionToken) {
    throw new Error("No se encontró token de sesión");
  }

  const client = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });

  // Agregar un interceptor personalizado para manejar errores de sesión
  client.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_OUT") {
      console.log("Usuario desconectado o sesión terminada");
    } else if (event === "TOKEN_REFRESHED" && session) {
      console.log("Token refrescado exitosamente");
      // Aquí podrías actualizar las cookies en un handler de servidor
    }
  });

  // No necesitamos esta parte porque ya tenemos un listener arriba
  // Esta línea se puede eliminar

  return client;
}