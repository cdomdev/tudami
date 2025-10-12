import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { NextRequest, NextResponse } from "next/server";
import { deleteAccountHelper } from "../helpers/helper.user";

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const supbase = await supabaseServerClient();
  try {
    
    if (!id) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
    }

    const res = await deleteAccountHelper(supbase, id);

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({
      message: "Error en la solicitud ROUTEDELETEACOUNT",
      error,
    });
  }
}
