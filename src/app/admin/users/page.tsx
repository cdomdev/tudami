"use client";

import { useEffect, useState } from "react";
import { TableReseources } from "../components/TableResources";
import { ButtonCs } from "../components/Button";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { listDataResource } from "../_lib/resources";
import { SchemaResoucesResponse } from "@/schemas";
import { TableSkeleton } from "../components/skeletons/TableSkeleton";

export default function PageUsersAmd() {
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
      <section className="flex justify-between px-12  ">
        <header>
          <h1 className="text-lg md:text-2xl mb-3 font-semibold">Usuarios</h1>
        </header>
      </section>
      <section className="mt-10 lg:max-w-7xl mx-auto">
        <h2 className="text-foreground md:text-base mb-4">
          Recursos disponibles
        </h2>
        <span>Seccion en proceso....</span>
      </section>
    </main>
  );
}
