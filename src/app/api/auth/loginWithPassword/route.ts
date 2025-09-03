import { supabaseAuth } from "@/utils/supabase/supabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { InitSesion } from "./helpers/helper.loginPss";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password, access_token } = body;
  if (!email || !password) {
    return NextResponse.json(
      { error: "Datos para el inicio requeridos" },
      { status: 400 }
    );
  }

  const supabase = await supabaseAuth(access_token);

  try {
    const data = await InitSesion(email, password, supabase);

    return NextResponse.json({
      success: true,
      message: "Autenticación exitosa",
      data,
    });
  } catch (error) {
    console.error("Error en auth/loginWithPassword:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
