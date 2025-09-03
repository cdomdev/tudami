import { NextRequest, NextResponse } from "next/server";
import { generateApprovalToken } from "@/app/api/auth/utils/generateTokenAprov";
import { supabaseAuth } from "@/utils/supabase/supabaseClient";
import {
  validateAccessToken,
  upsertUserProfile,
  setupAuthCookies,
  ensureUserPreferences,
} from "./helpers/helper.authPro";
import { getUserProfile } from "@/lib/user-profile";

/**
 * Ruta principal de autenticación - Maneja todo el flujo de inicio de sesión
 * Incluye: validación de sesión, generación de tokens, guardado en cookies, inicialización de usuario
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, refreshToken } = body;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Token de acceso requerido" },
        { status: 400 }
      );
    }

    // 1. Inicializar Supabase con el token de acceso
    const supabase = await supabaseAuth(accessToken);

    // 2. Validar el token de acceso y obtener el usuario autenticado
    let authUser;
    try {
      const validationResult = await validateAccessToken(accessToken, supabase);
      authUser = validationResult.data.user;
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error ? error.message : "Token de acceso inválido",
        },
        { status: 401 }
      );
    }

    // 3. Extraer datos del usuario autenticado
    const { id } = authUser;
    const full_name =
      authUser.user_metadata?.full_name ||
      authUser.user_metadata?.user_name ||
      "";
    const avatar_url =
      authUser.user_metadata?.picture ||
      authUser.user_metadata?.avatar_url ||
      "";

    // 4. Generar token de aprobación
    const approvalToken = generateApprovalToken(id);

    try {
      await upsertUserProfile({
        id,
        email: authUser.email,
        full_name: full_name || "",
        avatar_url: avatar_url,
        approvalToken,
        supabase,
      });
    } catch (error) {
      console.error("[AUTH] Error al insertar usuario:", error);
      return NextResponse.json(
        { error: "Error al crear/actualizar usuario" },
        { status: 500 }
      );
    }

    // 6. Configurar cookies de forma segura
    await setupAuthCookies({
      accessToken,
      refreshToken,
      approvalToken,
    });

    // 7. Crear preferencias por defecto solo si el usuario no las tiene
    try {
      await ensureUserPreferences(id, supabase);
    } catch (error) {
      console.error("Error al crear preferencias del usuario:", error);
      // No retornamos error aquí porque las preferencias pueden crearse después
    }

    //obtener datos del usuario para retornar
    let data;
    try {
      data = await getUserProfile(id, supabase);
    } catch (error) {
      console.error("Error al obtener perfil del usuario:", error);
      return NextResponse.json(
        { error: "Error obteniendo perfil del usuario" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Autenticación exitosa",
      user: data,
    });
  } catch (error) {
    console.error("Error en auth/login:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
