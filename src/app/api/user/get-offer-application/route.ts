import { NextRequest, NextResponse } from "next/server";
import { getListApplicationsHelper } from "../helpers/helper.user";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const offer_id = searchParams.get("offer_id") || "";
    const supabase = await supabaseServerClient()
    try {
        const { data, error } = await getListApplicationsHelper(offer_id, supabase)
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
        return NextResponse.json({
            error: "Error interno del servidor"
        }, { status: 500 })

    }
}