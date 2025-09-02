import { supabaseAuth } from "@/utils/supabase/supabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server"
import { generateApprovalToken } from "../utils/generateTokenAprov";
import { cookies } from "next/headers";
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email, password, access_token } = body
    if (!email || !password) {
        return NextResponse.json(
            { error: "Datos para el inicio requeridos" },
            { status: 400 }
        )
    }
    const supabase = await supabaseAuth(access_token)
    try {
        const data = InitSesion(email, password, supabase)

        return NextResponse.json({
            success: true,
            message: "Autenticación exitosa",
            user: data,
        });

    } catch (error) {
        console.error("Error en auth/loginWithPassword:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

async function InitSesion(email: string, password: string, supabase: SupabaseClient) {

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    const id = data.user?.id || ""
    const approvalToken = generateApprovalToken(id)
    const accessToken = data.session?.access_token || ""
    const refreshToken = data.session?.refresh_token || ""

    // setear cookies

    await setupAuthCookies(accessToken, refreshToken, approvalToken)


    if (error) {
        throw new Error("No se pudo proceder con el inicio de sesion, intentalo nuevamente")
    }
    return data
}

async function setupAuthCookies(accessToken: string, refreshToken: string, approvalToken: string) {
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

