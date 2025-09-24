import Image from "next/image";
import Link from "next/link";

export default function PageSuccessUpdatePassword() {
  return (
    <div className="max-w-md mx-auto p-8 text-center space-y-6">
      <div className="flex justify-center">
        <Image
          src="/shield.svg"
          alt="Contraseña actualizada"
          width={80}
          height={80}
        />
      </div>

      <h1 className="text-2xl font-semibold text-foreground">
        ¡Contraseña actualizada!
      </h1>

      <p className="text-foreground dark:text-gray-300 leading-relaxed">
        Tu contraseña se cambió correctamente. Ahora puedes iniciar sesión con
        tu nueva clave de acceso.
      </p>

      <div className="pt-6">
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
