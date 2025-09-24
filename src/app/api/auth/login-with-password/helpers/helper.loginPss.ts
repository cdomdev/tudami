import { SupabaseClient } from "@supabase/supabase-js";
import { generateApprovalToken } from "../../utils/generateTokenAprov";
import { cookies } from "next/headers";
import { getDataUser } from "@/app/api/user/helpers/helper.user";

export async function InitSesion(
  email: string,
  password: string,
  supabase: SupabaseClient
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  const id = data.user?.id || "";
  const approvalToken = generateApprovalToken(id);
  const accessToken = data.session?.access_token || "";
  const refreshToken = data.session?.refresh_token || "";

  if (!data || error) {
    throw new Error(
      "Los datos ingresados no son correctos, intente nuevamente"
    );
  }

  // setear cookies

  await setupAuthCookies(accessToken, refreshToken, approvalToken);

  //   identificador de usuario
  const userId = data.user.id;
  const user = await getDataUser(userId, supabase);
  return user;
}

async function setupAuthCookies(
  accessToken: string,
  refreshToken: string,
  approvalToken: string
) {
  const cookieStore = await cookies();

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  // Cookie para el token de acceso (1 día)
  cookieStore.set("sb-access-token", accessToken, {
    ...cookieOptions,
    // 24 horas
    maxAge: 60 * 60 * 24,
  });

  // Cookie para refresh token (7 días)
  cookieStore.set("sb-refresh-token", refreshToken, {
    ...cookieOptions,
    // 7 días
    maxAge: 60 * 60 * 24 * 7,
  });

  // Cookie para el token de aprobación (1 día)
  cookieStore.set("approval_token", approvalToken, {
    ...cookieOptions,
    // 24 horas
    maxAge: 60 * 60 * 24,
  });
}

