import { NextRequest, NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import {
  insertCommentOnly,
  runCommentSideEffects,
} from "../../helpers/comments";

export async function POST(request: NextRequest) {
  const { text, question_id, user_id } = await request.json();
  const supabase = await supabaseServerClient();
  try {
    // Insertar rápidamente y devolver al cliente
    const insertRes = await insertCommentOnly({
      content: text,
      question_id,
      user: { id: user_id },
      supabase,
    });

    if (insertRes.error) {
      return NextResponse.json({ error: insertRes.error });
    }

    const commentData = insertRes.data;

    // Ejecutar efectos secundarios en background (no bloquear la respuesta)
    void (async () => {
      try {
        await runCommentSideEffects({
          commentData,
          question_id,
          user: { id: user_id },
          supabase,
        });
      } catch (e) {
        console.error("Error running comment side-effects:", e);
      }
    })();

    return NextResponse.json({ commentData });
  } catch (error) {
    return NextResponse.json(error);
  }
}
