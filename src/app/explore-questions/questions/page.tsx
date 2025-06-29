// "use client";

// import { useSearchParams } from "next/navigation";

export default function QuestionPage({
  params,
  searchParams,
}: {
  params: { query: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryParam = searchParams.query;

  return (
    <section className="py-8 mb-8 space-y-6">
      <h1 className="text-xl font-bold">Página de preguntas</h1>
      <p>Categoría de ruta: {params.query}</p>
      <p>
        Parámetro de consulta: {queryParam || "No hay parámetro de consulta"}
      </p>

      {/* Simular contenido largo */}
    </section>
  );
}
