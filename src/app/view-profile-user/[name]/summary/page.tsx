"use client";

import { useSearchParams } from "next/navigation";
export default function SummaryPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  return (
    <>
      <h3>Resumen del Perfil</h3>
      <p>Consulta: {query}</p>
    </>
  );
}
