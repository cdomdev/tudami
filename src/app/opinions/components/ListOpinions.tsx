"use client";
import { getOpinios } from "@/lib/opinion";
import { useEffect, useState } from "react";
import { CardOpinions } from "@/components/CardOpinions";
import { Opinios } from "@/components/CardOpinions";
import { SkeletonOpinios } from "@/components/SkeletonOpinios";
import { useSearchParams } from "next/navigation";
import { Pagination } from "@/components/pagination";

export function ListOpinios() {
  const [data, setData] = useState<Opinios[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [total, setTotal] = useState(0);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    try {
      async function getData() {
        const { data, count } = await getOpinios(from, to);
        setData(data || []);
        if (count) setTotal(count);
      }
      getData();
    } catch (error) {
      console.error("Error feching data", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  if (loading) return <SkeletonOpinios />;

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 row-auto">
        {data.map((op) => (
          <CardOpinions key={op.id} {...op} />
        ))}
      </div>

      <Pagination
        basePath="/opinions"
        currentPage={page}
        pageSize={pageSize}
        searchParams={searchParams}
        totalItems={total}
      />
    </div>
  );
}
