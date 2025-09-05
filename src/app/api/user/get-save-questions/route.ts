import { NextResponse } from "next/server";
import {  getSavedQuestionsHelper } from "../helpers/helper.user";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function GET() {
    const supabase = await supabaseServerClient()
    try {
        const {data, error} = await getSavedQuestionsHelper(supabase)

    
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