import React from "react";
import { Resend } from "resend";
import { query } from "./query";

const resend = new Resend(process.env.NEXT_PUBLIC_API_KEY);

export async function sendEmail(
  subject: string,
  to: string,
  children: React.ReactNode
) {
  try {
    await resend.emails.send({
      from: "Equipo Tudami <team@info.tudami.com>",
      to,
      subject,
      react: children,
    });
    console.log("Correo enviado a", to);
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw error;
  }
}

export async function send() {
  await query("/api/send", "POST")
}