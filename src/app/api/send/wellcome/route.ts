import { resend } from "@/emails/congif";
import { PasswordUpdated } from "@/emails/PasswordUpdated";
import { NextResponse } from "next/server";

//  email de bienvenida
export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Equipo tudami <team@info.tudami.com>",
      to: ["cdomreyes@gmail.com"],
      subject: "Hello world",
      react: PasswordUpdated({ userName: "carlos" }),
    });

    console.log("data del mail", data)
    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
