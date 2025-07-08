/*
 * API para validar el token de aprobación.
 */
import { validateTokenApproval } from "@/app/view-profile-user/lib/getDataProfile";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const cookieStore = await cookies();
  const approvalToken = cookieStore.get("approval_token");

  // Validar el token de aprobación
  const isValid = await validateTokenApproval(
    token || approvalToken?.value || ""
  );

  if (!isValid) {
    return NextResponse.json(
      { error: "Token de aprobación inválido" },
      { status: 401 }
    );
  }

  return NextResponse.json({ message: "Token de aprobación válido" });
}
