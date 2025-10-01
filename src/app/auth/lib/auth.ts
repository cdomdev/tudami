import { supabase } from "@/utils/supabase/supabaseClient";
import { query } from "@/lib/query";

type Providers = "google" | "github";
const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    "https://3000-firebase-tudami-1749997888484.cluster-ux5mmlia3zhhask7riihruxydo.cloudworkstations.dev";
  url = url.startsWith("http") ? url : `https://${url}`;
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};

/**
 *
 * inicio de sesión con proveedor externo
 * @param provider - 'google' | 'github'
 */
export async function loginWithProvider(provider: Providers) {
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${getURL()}/auth/callback`,
    },
  });
}

/**
 * callback para manejo de datos después del inicio de sesión con proveedor externo
 * @param accessToken
 * @param refreshToken
 * @returns
 */

export async function loginCallback(accessToken: string, refreshToken: string) {
  return await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ accessToken, refreshToken }),
  });
}

/**
 *
 * registro de usuario con email y password
 * @param param0 - full_name, email, password
 * @returns
 */
export async function registerUser({
  full_name,
  email,
  password,
}: {
  full_name: string;
  email: string;
  password: string;
}) {
  if (!email || !password) {
    throw new Error("Faltan datos para proceder con el registro");
  }

  const { data: dataAuth, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error?.code === "user_already_exists")
    throw new Error("El correo ingresado ya se encuentra registrado");

  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name,
      email,
      access_token: dataAuth.session?.access_token,
    }),
  });

  // generar notificaion de bienvenida

  if (!response.ok) {
    throw new Error("No pudimos completar el registro, intente nuevamente");
  }
  const data = await response.json();
  return { data, success: true };
}

/**
 * función para iniciar sesión con email y password
 * @param email
 * @param password
 * @returns
 */
export async function loginWithPassword(email: string, password: string) {
  if (!email || !password)
    throw new Error("Faltan datos para proceder con el inicio de sesion");

  const { data: dataAuth, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error && error?.code === "invalid_credentials")
    throw new Error(
      "Los datos ingresados no son correctos, intente nuevamente"
    );

  const response = await fetch("/api/auth/login-with-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      access_token: dataAuth.session?.access_token,
    }),
  });

  if (!response.ok) {
    throw new Error(
      "Los datos ingresados no son correctos, intente nuevamente"
    );
  }

  const data = await response.json();
  const user = data.data;

  return user;
}

/**
 * función para enviar código de recuperación de contraseña
 * @param email
 */

export async function sendRequestForgotPassword(email: string) {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password?email=${email}`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: url,
  });

  if (error) {
    console.error("Error en resetPasswordForEmail:", error.message);
    throw new Error(error.message);
  }
  return true;
}

export async function updatePassword(password: string, to: string) {
  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      throw error;
    }
    // send mail
    await sendMailConfirmUpdatePw(to);
  } catch (error) {
    console.error("Error al cambiar contraseña:", error);
    throw error;
  }
}

async function sendMailConfirmUpdatePw(to: string) {
  try {
    await query(`/api/auth/forgot?email=${to}`, "POST");
  } catch (err) {
    console.error("Fallo inesperado al enviar:", err);
  }
}

/**
 * función para cerrar sesión
 */

export async function logout() {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!res.ok) {
      console.error("Error al cerrar sesión en el servidor");
      return;
    }
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
}
