import { NextRequest, NextResponse } from "next/server";
import { savaDataNewHelper } from "../../helpers/news"
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";



export async function POST(req: NextRequest) {
    const body = await req.json();
    const { data } = body
    const supabase = await supabaseServerClient()
    try {
        const res = await savaDataNewHelper(supabase, data)
        return NextResponse.json(res, { status: 200 })
    } catch (e) {
        return NextResponse.json(e, { status: 500 })
    }
}