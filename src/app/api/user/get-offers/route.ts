import { NextRequest, NextResponse } from "next/server";
import { getOffersHelper } from "../helpers/helper.user";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id") || "";
    const supabase = await supabaseServerClient()
    try {
        const { data, error } = await getOffersHelper(userId, supabase)
        if (error) {
            return NextResponse.json({
                error: "Error obteniendo aplicaciones"
            }, { status: 500 })
        }
        return NextResponse.json({
            success: true,
            data
        })
    } catch (error) {
        console.log("Error interno del servidor", error)
        return NextResponse.json({
            error: "Error interno del servidor"
        }, { status: 500 })

    }
}