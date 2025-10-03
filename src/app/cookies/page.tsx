import { Calendar } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Política de Cookies",
    template: "%s | Tudami",
  },
  description:
    "Infórmate sobre el uso de cookies en Tudami. Descubre cómo utilizamos estas herramientas para mejorar tu experiencia y garantizar un servicio seguro.",
};

export default function CookiesPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 mt-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Política de Cookies
      </h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300 ">
        En <strong>Tudami</strong> utilizamos cookies para mejorar tu
        experiencia de usuario. El uso de cookies se realiza conforme a la
        normativa colombiana vigente y, de manera complementaria, a las mejores
        prácticas internacionales.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-3">
        1. ¿Qué son las cookies?
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Las cookies son pequeños archivos de texto que se almacenan en tu
        navegador cuando visitas un sitio web. Permiten reconocer tu
        dispositivo, recordar tus preferencias y facilitar ciertas
        funcionalidades de la plataforma.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-3">
        2. Tipos de cookies que usamos
      </h2>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Cookies esenciales:</strong> necesarias para el funcionamiento
          básico del sitio (ejemplo: inicio de sesión seguro).
        </li>
        <li>
          <strong>Cookies de preferencias:</strong> almacenan configuraciones
          como idioma, tema visual o recordatorios de sesión.
        </li>
        <li>
          <strong>Cookies de terceros:</strong> pueden ser utilizadas por
          proveedores externos para integrar servicios (ejemplo: análisis de
          tráfico o integraciones sociales).
        </li>
      </ul>

      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-3">
        3. Base legal y consentimiento
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        El uso de cookies se basa en tu consentimiento informado. Al continuar
        navegando en nuestra plataforma aceptas su instalación, salvo en el caso
        de las cookies estrictamente necesarias para el funcionamiento del
        sitio.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-3">
        4. Cómo gestionar las cookies
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Puedes configurar tu navegador para bloquear, eliminar o recibir
        notificaciones sobre el uso de cookies. Ten en cuenta que, si rechazas
        algunas cookies, ciertas funcionalidades de la plataforma pueden no
        estar disponibles.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-3">
        5. Normativa aplicable
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Esta política se ajusta a la <strong>Ley 1581 de 2012</strong> y el{" "}
        <strong>Decreto 1377 de 2013</strong> sobre protección de datos en
        Colombia, así como a los principios de transparencia y consentimiento
        establecidos en regulaciones internacionales como el RGPD (Reglamento General de Protección de Datos).
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-3">
        6. Actualizaciones
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Podremos actualizar esta política en cualquier momento para adaptarnos a
        cambios normativos o tecnológicos. Te recomendamos revisarla
        periódicamente.
      </p>

      <time
        dateTime="2025-10-01"
        className="mt-8 text-sm text-gray-500 dark:text-gray-400 inline-flex items-center"
      >
        <Calendar className="w-4 h-4 mr-1" /> Última actualización: Octubre 2025
      </time>
    </section>
  );
}
