import { supabaseAuth } from "@/utils/supabase/supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { generateApprovalToken } from "../utils/generateTokenAprov";
import { cookies } from "next/headers";

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

async function InitSesion(
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

  if (error) {
    throw new Error(
      "No se pudo proceder con el inicio de sesion, intentalo nuevamente"
    );
  }

  // setear cookies

  await setupAuthCookies(accessToken, refreshToken, approvalToken);

  //   identificador de usuario
  const userId = data.user.id;
  const user = await getDataForContext(supabase, userId);
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

async function getDataForContext(supabase: SupabaseClient, id: string) {
  const { data } = await supabase
    .from("users")
    .select(
      `
      id,
      full_name,
      avatar_url,
      email,
      phone,
      bio,
      country,
      city,
      department,
      created_at,
      user_profile_preferences (
        profile_public,
        allow_email,
        allow_whatsapp
      ),
      questions(count),
      question_comments(count),
      user_reputation (
        id,
        score
      ),
      user_achievements(
        id,
        achievement_id
      ) 
    `
    )
    .eq("id", id)
    .single();

  //Normalizar

  const normalizedPreferences =
    typeof data?.user_profile_preferences === "object" &&
    !Array.isArray(data.user_profile_preferences)
      ? data.user_profile_preferences
      : {
          profile_public: true,
          allow_email: false,
          allow_whatsapp: false,
        };

  // Normalizar user_reputation
  const reputationArray = data?.user_reputation;
  const normalizedReputation =
    Array.isArray(reputationArray) && reputationArray.length > 0
      ? reputationArray[0]
      : {
          id: 0,
          score: 0,
        };
  // Normalizar preguntas y respuestas
  const questionsCount = Array.isArray(data?.questions)
    ? data.questions[0]?.count ?? 0
    : 0;
  const commentsCount = Array.isArray(data?.question_comments)
    ? data?.question_comments[0]?.count ?? 0
    : 0;

  return {
    ...data,
    user_profile_preferences: normalizedPreferences,
    user_reputation: normalizedReputation,
    questions: questionsCount,
    question_comments: commentsCount,
  };
}
