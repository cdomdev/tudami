import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { NextRequest, NextResponse } from "next/server";
import { deleteAccountHelper } from "../helpers/helper.user";

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const supbase = await supabaseServerClient();

  if (!id) {
    return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
  }
  try {
    const res = await deleteAccountHelper(supbase, id);
    console.log("Result from deleteAccountHelper:", res);

    return NextResponse.json({
      success: true,
      message: "Cuenta eliminada exitosamente",
      data: res,
    });
  } catch (error) {
    console.error("Error en la solicitud ROUTEDELETEACOUNT:", error);
    return NextResponse.json({
      message: "Error en la solicitud ROUTEDELETEACOUNT",
      error,
    });
  }
}
