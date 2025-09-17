import { NextRequest } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { saveResourceHelper } from '../../helpers/save.helper'

export async function POST(req: NextRequest) {
    const data = await req.json()
    const supabase = await supabaseServerClient()
    try {
        const res = await saveResourceHelper(data, supabase)
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 })
    }
}