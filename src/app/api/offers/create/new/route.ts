import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { NextResponse } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";


type OfferData = {
    id: string;
}[];


type CreateOffers = {
    success: boolean;
    data?: OfferData;
    error?: string;
};

export async function POST(request: Request) {
    try {
        const supabase = await supabaseServerClient();
        const { title, content } = await request.json();
        if (!title || !content) {
            return NextResponse.json({ error: "Faltan datos para procesar la solicitud" }, { status: 400 });
        }

        const res = await createOffer(title, content, supabase)
        return NextResponse.json(res);
    } catch (error) {
        console.error("Error en la creación de la pregunta:", error);
        return NextResponse.json(
            { error: "Error en la creación de la pregunta" },
            { status: 500 }
        );
    }
}


/**
 * funcion para crea la oferta
 */


export async function createOffer(
    title: string,
    content: string,
    supabaseClient: SupabaseClient
): Promise<CreateOffers> {
    const { data: sessionData } = await supabaseClient.auth.getUser();
    const userId = sessionData?.user?.id;

    if (!userId) {
        throw new Error("Usuario no autenticado");
    }

    const { data, error } = await supabaseClient
        .from("offers")
        .insert([
            {
                user_id: userId,
                title,
                details: content,
                payment: true,
                status: "pending",
            },
        ])
        .select("id");

    if (error) {
        throw new Error(`Error al guardar en Supabase: ${error.message}`);
    }


    // validar insignia de pregunta del usuario
    // const datainsignia = await asignBadgeIfNeeded(userId, supabaseClient);

    // Asignar puntos de reputación al usuario
    // await assignReputationPoints(userId, supabaseClient);

    // Retornar el resultado
    return {
        success: true,
        data,
    };
}