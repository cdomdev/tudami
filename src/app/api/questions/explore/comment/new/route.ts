import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import {createComment} from '../../helpers/comments'

export async function POST(request: NextRequest) {
  const { text, question_id, user_id } = await request.json();
  const supabase = await supabaseServerClient();
  try {
    const data = await createComment({
      content: text,
      question_id,
      user: { id: user_id },
      supabase,
    });
    return NextResponse.json(data);  
  } 
  catch (error) {
    return NextResponse.json(error);
  }
}
