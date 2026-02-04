"use client";

import { useEffect, useState } from "react";
import { TableReseources } from "../components/TableResources";
import { ButtonCs } from "../components/Button";
import { Plus } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { listDataResource } from "../_lib/resources";
import { SchemaResoucesResponse } from "@/schemas";
import { TableSkeleton } from "../components/skeletons/TableSkeleton";
import { Button } from "@/components/ui/button";

export default function PageResourcesAmd() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<SchemaResoucesResponse[]>([]);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const res = await listDataResource(page, pageSize);
      if (res && Array.isArray(res.data)) {
        setResponse(res.data);
        setTotal(res.total || 0);
      }
      setLoading(false);
    }
    fetchData();
  }, [page, pageSize]);

  const handleDelete = (id: number) => {
    setResponse(prev => prev.filter(resource => resource.id !== id));
    setTotal(prev => prev - 1);
  };

  const totalPages = Math.ceil(total / pageSize);

  const goToPage = (newPage: number) => {
    router.push(`/admin/resources?page=${newPage}`);
  };

  return (
    <main>
      <section className="flex justify-between px-12  ">
        <header>
          <h1 className="text-lg md:text-2xl mb-3 font-semibold">Recursos</h1>
        </header>
        <ButtonCs
          text="Agregar nuevo recurso"
          icon={Plus}
          variant={"default"}
          className="group"
          href="/admin/resources/new"
        />
      </section>
      <section className="mt-10 lg:max-w-7xl mx-auto">
        <h2 className="text-foreground md:text-base mb-4">
          Recursos disponibles ({total} total)
        </h2>
        {loading ? <TableSkeleton /> : <TableReseources data={response} onDelete={handleDelete} />}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1}
          >
            Anterior
          </Button>
          <span className="text-sm">
            Página {page} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages}
          >
            Siguiente
          </Button>
        </div>
      </section>
    </main>
  );
}
