import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { NextRequest, NextResponse } from "next/server";
import {createQuestion} from '../helpers/index'

export async function POST(request: NextRequest) {
  try {
    const { title, content, tags } = await request.json();
    const supabase = await supabaseServerClient();
    const result = await createQuestion(title, content, tags, supabase);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error en la creación de la pregunta:", error);
    return NextResponse.json(
      { error: "Error en la creación de la pregunta" },
      { status: 500 }
    );
  }
}
