import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "KEYS no configuradas en el cliente de Supabase: NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}
/**
 *  cliente de Supabase con un token de acceso para manejo de la sesion
 *
 */
export async function supabaseAuth(accessToken: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}

/*
 * Cliente de Supabase con token de cookie para uso general desde las rutas de servidor, para uso general
 */
export async function supabaseClient() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sb-access-token")?.value;

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });
}
