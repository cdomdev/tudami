import Image from "next/image";
import Link from "next/link";

export default function PageSuccessSendRequest() {
  return (
    <div className="max-w-md mx-auto p-8 text-center space-y-4">
      <div className="flex justify-center">
        <Image
          src="/send-mail.svg"
          alt="Correo enviado"
          width={120}
          height={120}
          className="animate-pulse"
        />
      </div>

      <h1 className="text-2xl font-semibold text-foreground">
        ¡Solicitud enviada con éxito!
      </h1>

      <p className="text-foreground dark:text-gray-300 leading-relaxed text-wrap">
        Hemos validado tu información correctamente. Revisa tu correo
        electrónico, allí encontrarás un enlace para{" "}
        <span className="font-medium text-gray-800">
          restablecer tu contraseña.
        </span>
      </p>

      <p className="text-sm text-foreground dark:text-gray-200 italic font-medium">
        Si no encuentras el correo en tu bandeja de entrada, revisa la carpeta{" "}
        <span className="font-medium">Spam</span> o{" "}
        <span className="font-medium">Correo no deseado</span>.
      </p>

      <div className="pt-4">
        <Link
          href="/auth/login"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
}
