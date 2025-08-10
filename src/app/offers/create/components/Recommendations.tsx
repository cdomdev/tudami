import Link from "next/link";
export function Recommendations() {
  return (
    <>
      <h2 className="font-medium text-sm md:text-base mb-2">
        Recomendaciones para publicar una oferta
      </h2>
      <div className="border mb-3 dark:border-gray-50"></div>
      <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground leading-relaxed">
        <li>
          <strong>Ofertas siempre remuneradas:</strong> Toda oferta publicada en
          esta sección se considera que incluye algún tipo de compensación
          económica para quienes apliquen y sean seleccionados.
        </li>
        <li>
          <strong>Si no hay incentivo económico:</strong> Para solicitudes de
          ayuda sin pago, utiliza la sección{" "}
          <strong>
            <Link href="/questions/create" className="text-blue-500 hover:underline">
              Preguntas.
            </Link>
          </strong>
        </li>
        <li>
          <strong>Describe claramente la oportunidad:</strong> Explica de forma
          breve y concreta la tarea, servicio o colaboración que buscas cubrir.
        </li>
        <li>
          <strong>El pago se realiza solo tras la aprobación:</strong> La
          compensación acordada debe entregarse únicamente cuando el candidato
          haya aceptado tu oferta.
        </li>
        <li>
          <strong>Pagos fuera de la plataforma:</strong> La gestión de los pagos
          e incentivos se hace directamente entre las partes, por los medios que
          acuerden.
        </li>
         <li>
          <strong>Mas informacion: </strong>
          Visita la <Link href="/terms" className="text-blue-500 hover:underline">pagina de terminos y condiciones</Link> para mas detalles sobre el proceso de publicacion de ofertas.
        </li>
      </ul>
      <div className="p-3 bg-accent dark:bg-card rounded-sm mt-6 border border-primary/20">
        <p className="text-sm text-accent-foreground font-normal">
          Publicar ofertas claras y transparentes aumenta la confianza y atrae
          más candidatos calificados.
        </p>
      </div>
    </>
  );
}
