import { resend } from "@/emails/congif";
import { PasswordUpdated } from "@/emails/PasswordUpdated";

export async function sendMailConfirmUpdatePw(to: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Tudami <team@info.tudami.com>",
      to: to,
      subject: "Cambio de contraseña realizado con exito",
      react: PasswordUpdated({email: to}),
    });

    if (error) {
      console.error("Error enviando correo:", error);
      return Response.json({ error }, { status: 500 });
    }

    console.log("Correo enviado:", data);
    return Response.json({ success: true, data });
  } catch (err) {
    console.error("Fallo inesperado al enviar:", err);
    return Response.json({ error: "Error interno de envío" }, { status: 500 });
  }
}