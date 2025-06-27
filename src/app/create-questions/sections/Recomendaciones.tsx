export function Recomendaciones() {
  return (
    <>
      <h3 className="font-medium text-sm md:text-base mb-2  ">
        Cómo hacer una buena pregunta
      </h3>
      <div className="border mb-3 dark:border-gray-50"></div>
      <ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground leading-relaxed">
        <li>
          <strong>Sé específico con el título:</strong> Un título claro como:
          <strong>¿Cómo subir evidencias a Sofia Plus? </strong>
          da más claridad que un simple:{" "}
          <strong>Necesito ayuda urgente.</strong>
        </li>
        <li>
          <strong>Menciona el contexto educativo:</strong> Indica si es una
          tarea del SENA, una actividad escolar o un proyecto personal.
        </li>
        <li>
          <strong>Describe el problema concreto:</strong> Explica exactamente
          qué parte del proceso o concepto no entiendes.
        </li>
        <li>
          <strong>Añade detalles relevantes:</strong> Versiones de software,
          instrucciones recibidas o capturas de pantalla pueden ser útiles.
        </li>
        <li>
          <strong>Revisa tu pregunta antes de enviar:</strong> Asegúrate de que
          sea clara y contenga la información necesaria para recibir ayuda.
        </li>
      </ul>
      <div className="p-3 bg-gray-700 dark:bg-accent rounded-xs mt-6 border border-primary/20">
        <p className="text-sm text-primary-foreground font-medium">
          Las preguntas bien formuladas reciben respuestas hasta 3 veces más
          rápido.
        </p>
      </div>
    </>
  );
}
