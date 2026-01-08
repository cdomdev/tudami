"use client";

import { ButtonCs } from "../components/Button";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { SchemaResoucesResponse } from "@/schemas";
import { useEffect, useState } from "react";
import { listDataResource } from "../_lib/resources";

export default function PageNews() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<SchemaResoucesResponse[]>([]);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const res = await listDataResource(page, pageSize);
      setResponse(res);
      setLoading(false);
    }
    fetchData();
  }, [page, pageSize]);
  return (
    <main>
      <section className="flex justify-between px-12">
        <header>
          <h1 className="text-lg md:text-2xl mb-3 font-semibold">Noticias</h1>
        </header>
        <ButtonCs
          text="Agregar noticia"
          icon={Plus}
          variant={"default"}
          className="group"
          href="/admin/news/add"
        />
      </section>
      <section className="mt-10 lg:max-w-7xl mx-auto">
        <h2 className="text-foreground md:text-base mb-4">
          Noticias disponibles
        </h2>
       <span>No hay noticias disponibles</span>
      </section>
    </main>
  );
}
