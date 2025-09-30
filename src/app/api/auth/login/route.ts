import { NextRequest, NextResponse } from "next/server";
import { generateApprovalToken } from "@/app/api/auth/utils/generateTokenAprov";
import { supabaseAuth } from "@/utils/supabase/supabaseClient";
import {
  validateAccessToken,
  upsertUserProfile,
  setupAuthCookies,
  ensureUserPreferences,
} from "./helpers/helper.authPro";
import { getDataUser } from "@/app/api/user/helpers/helper.user";
import { generateNotificationWelcome, mailWellcome} from "../register/helpers/helper.register";
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

    //  Inicializar Supabase con el token de acceso
    const supabase = await supabaseAuth(accessToken);

    //  Validar el token de acceso y obtener el usuario autenticado
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

    //  Extraer datos del usuario autenticado

    const { id } = authUser;
    const full_name =
      authUser.user_metadata?.full_name ||
      authUser.user_metadata?.user_name ||
      "";
    const avatar_url =
      authUser.user_metadata?.picture ||
      authUser.user_metadata?.avatar_url ||
      "";

    // validar si el usuario ya esta registrado en db
    let user = null;
    try {
      user = await getDataUser(id, supabase);
    } catch (error) {
      // Aquí solo capturas el error de "usuario no encontrado"
      console.warn(
        "[AUTH] Usuario no encontrado, procediendo con registro:",
        error
      );
    }

    if (user) {
      // Si existe, seguimos flujo normal
      const approvalToken = generateApprovalToken(id);

      await setupAuthCookies({
        accessToken,
        refreshToken,
        approvalToken,
      });

      return NextResponse.json({
        success: true,
        message: "Autenticación exitosa",
        user,
      });
    }

    // -------------------
    // FLUJO DE REGISTRO
    // -------------------
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

    //  Configurar cookies de forma segura
    await setupAuthCookies({
      accessToken,
      refreshToken,
      approvalToken,
    });

    // Crear preferencias por defecto
    try {
      await ensureUserPreferences(id, supabase);
    } catch (error) {
      console.error("Error al crear preferencias del usuario:", error);
    }

    // Obtener datos del usuario recién creado
    let data;
    try {
      data = await getDataUser(id, supabase);
    } catch (error) {
      console.error("Error al obtener perfil del usuario:", error);
      return NextResponse.json(
        { error: "Error obteniendo perfil del usuario" },
        { status: 500 }
      );
    }

    // notificacion de bienvenida
    await generateNotificationWelcome(id, full_name, supabase);

    const mail = authUser.email || ""
    // Mail de bienvenida
    await mailWellcome(mail, full_name);

    return NextResponse.json({
      success: true,
      message: "Registro exitoso",
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
