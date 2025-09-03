import { cookies } from "next/headers";

export async function setCookiesRefresh(
  accessToken: string,
  refreshTokenNew: string,
  approvalToken: string
) {
  const cookieStore = await cookies();
  // 1 semana
  cookieStore.set("sb-access-token", accessToken, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });


  cookieStore.set("sb-refresh-token", refreshTokenNew, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  cookieStore.set("approval_token", approvalToken, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
}
