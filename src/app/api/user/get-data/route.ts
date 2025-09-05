import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { NextRequest, NextResponse } from "next/server";
import { getDataUser } from "../helpers/helper.user";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = await supabaseServerClient();
    const { userId } = body;
    const profileData = await getDataUser(userId, supabase)
    if (!profileData) {
      return NextResponse.json(
        { error: "Error obteniendo perfil del usuario" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      profileData
    });


  } catch (error) {
    console.error("Error en la obtención del perfil:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}