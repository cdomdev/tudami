"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { listaAllDataResourceClient } from "./lib/lisDtaResourcesClient";
import { SchemaResoucesResponse } from "@/schemas";
import { CardResources } from "./components/CardResources";
import { SkeletonCard } from "./components/SkeletonCardsResources";
import Link from "next/link";
import { TabsNav } from "./components/Tabs";
import { Pagination } from "@/components/pagination";

export default function ResourcesPage() {
  const [data, setData] = useState<SchemaResoucesResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const topic = searchParams.get("category") || "cursos";
  const type = searchParams.get("type") || undefined;
  const pageSize = 10;

  const totalItems = data.length;
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const { data } = await listaAllDataResourceClient(
        currentPage,
        pageSize,
        topic,
        type
      );
      setData(data || []);
      setLoading(false);
    }
    fetchData();
  }, [currentPage, topic, type]);

  if (loading) return <SkeletonCard />;

  if (!data.length) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">No hay recursos</h2>
        <p className="text-gray-500 mt-2">Intenta en otras secciones</p>
      </div>
    );
  }

  return (
    <>
      <aside className="px-7 flex-col md:px-8 inline-flex justify-end overflow-x-hidden">
        <h3 className="md:text-lg text-foreground font-semibold mb-2">
          Ver recursos
        </h3>
        <TabsNav />
      </aside>

      <section className="p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <Link
              href={`/resources/details/${item.slug}`}
              key={item.id}
              className="flex aspect-video flex-col h-full p-2"
            >
              <CardResources {...item} />
            </Link>
          ))}
        </div>
       
        <Pagination
          basePath="/resources"
          currentPage={currentPage}
          pageSize={pageSize}
          searchParams={searchParams}
          totalItems={totalItems}
        />
      </section>
    </>
  );
}
