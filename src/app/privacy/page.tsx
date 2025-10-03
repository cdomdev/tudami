import { Calendar } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Política de Privacidad",
    template: "%s | Tudami",
  },
  description:
    "Conoce cómo Tudami protege tus datos personales. Transparencia en la recolección, uso y almacenamiento de tu información.",
};

export default function PrivacyPage() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 mt-20">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Política de Privacidad
      </h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        En <strong>Tudami</strong>, nos tomamos muy en serio tu privacidad y la
        protección de tus datos personales. Esta política explica qué
        información recopilamos, cómo la utilizamos y cuáles son tus derechos
        conforme a la normativa aplicable en Colombia y a los estándares
        internacionales de protección de datos.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-3">
        1. Información que recopilamos
      </h2>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>Datos de registro: correo electrónico, nombre de usuario y foto o avatar de perfil.</li>
        <li>
          Información generada en el uso de la plataforma: preguntas,
          respuestas, interacciones y actividad dentro del sitio.
        </li>
        <li>
          Información técnica básica: cookies, navegador y datos
          de uso necesarios para mejorar la experiencia.
        </li>
      </ul>

      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-3">
        2. Finalidad del tratamiento
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Los datos recolectados se utilizan exclusivamente para:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>Prestar y mejorar los servicios ofrecidos en la plataforma.</li>
        <li>Personalizar tu experiencia como usuario.</li>
        <li>Mantener la seguridad y prevenir fraudes o usos indebidos.</li>
        <li>Contactarte en caso de soporte o notificaciones relevantes.</li>
      </ul>

      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-3">
        3. Compartición de la información
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        No compartimos tu información personal con terceros, salvo en los
        siguientes casos:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>Cuando sea requerido por ley o por autoridades competentes.</li>
        <li>
          Con proveedores de servicios tecnológicos estrictamente necesarios
          para la operación de la plataforma (por ejemplo: servicios de hosting
          o correo electrónico).
        </li>
      </ul>

      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-3">
        4. Derechos de los titulares
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Como usuario tienes derecho a acceder, actualizar, rectificar y
        solicitar la eliminación de tus datos personales en cualquier momento.
        También puedes revocar la autorización de uso de tus datos.
      </p>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Para ejercer estos derechos, puedes escribirnos a:{" "}
        <a
          href="mailto:soporte@tudami.com"
          className="text-blue-600 dark:text-blue-400 underline"
        >
          soporte@tudami.com
        </a>
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-3">
        5. Normativa aplicable
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Esta política se ajusta a lo establecido en la{" "}
        <strong>Ley 1581 de 2012</strong> y el{" "}
        <strong>Decreto 1377 de 2013</strong> de la República de Colombia, así
        como a los principios de legalidad, libertad, veracidad, transparencia,
        acceso y circulación restringida.
      </p>

      <h2 className="text-lg md:text-xl font-semibold mt-8 mb-3">
        6. Vigencia
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Esta política entra en vigencia desde su publicación y permanecerá
        vigente hasta tanto se modifique expresamente. Nos reservamos el derecho
        de actualizarla en cualquier momento para adaptarnos a cambios legales o
        tecnológicos.
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
