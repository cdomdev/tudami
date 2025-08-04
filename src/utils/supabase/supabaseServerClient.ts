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
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sb-access-token")?.value;

    if (!sessionToken) {
      console.warn("No se encontró token de sesión en las cookies");
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
        flowType: "pkce",
      },
    });

    // Agregar un interceptor personalizado para manejar errores de sesión
    client.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        console.log("Usuario desconectado o sesión terminada");
      } else if (event === "TOKEN_REFRESHED" && session) {
        console.log("Token refrescado exitosamente");
      }
    });

    return client;
  } catch (error) {
    console.error("Error al crear el cliente de Supabase:", error);
    throw new Error(`Error al inicializar el cliente de Supabase: ${error instanceof Error ? error.message : String(error)}`);
  }
}