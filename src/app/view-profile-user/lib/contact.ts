import { UserSchema } from "@/schemas";
import { toast } from "sonner";
/**
 * handle for send WhatsApp message
 * @param {UserSchema} dataProfile
 * @returns
 */
export function handleWhatsAppContact(dataProfile: UserSchema) {
  if (!dataProfile.phone) return;
  const message = encodeURIComponent(
    `Hola ${dataProfile.full_name}, vi tu perfil en Tudami y me gustaría contactarte.`
  );
  const whatsappUrl = `https://wa.me/+57${dataProfile.phone
    .toString()
    .replace(/\D/g, "")}?text=${message}`;
  window.open(whatsappUrl, "_blank");
}

/**
 * handle for copy email
 * @param dataProfile
 * @returns
 */

export async function handleCopyEmailContact(email: string ) {
  if (!email) return;
  try {
    await navigator.clipboard.writeText(email);
    toast.success("Correo copiado al portapapeles");
  } catch (error) {
    console.error("Error al copiar:", error);
    toast.error("No se pudo copiar el correo");
  }
}

/**
 * handle for send email
 * @param dataProfile
 * @returns
 */
export function handleEmailContact(email: string, full_name: string) {
  if (!email) return;
  const subject = encodeURIComponent("Contacto desde Tudami");
  const body = encodeURIComponent(
    `Hola ${full_name},\n\nVi tu perfil en Tudami y me gustaría contactarte.\n\nSaludos.`
  );
  const emailUrl = `mailto:${email}?subject=${subject}&body=${body}`;
  window.location.href = emailUrl;
}
