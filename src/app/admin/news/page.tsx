"use client"

import { ButtonCs } from "../components/ui/Button"
import { Plus } from "lucide-react"
import { TableSkeleton } from "../components/table/TableSkeleton"
import { TableReseources } from "../components/TableResources"
import { useSearchParams } from "next/navigation"
import { SchemaResoucesResponse } from "@/schemas"
import { useEffect, useState } from "react"
import { listDataResource } from "../_lib/resources"

export default function PageNews() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<SchemaResoucesResponse[]>([]);
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 10;

    useEffect(() => {
        setLoading(true);
        listDataResource(page, pageSize)
            .then((res) => {
                setResponse(res);
            })
            .finally(() => setLoading(false));
    }, [page, pageSize]);
    return (
        <>
            <section className="flex justify-between ">
                <div>
                    <h1 className="text-lg md:text-2xl mb-3 font-semibold">Noticias</h1>
                </div>
                <ButtonCs
                    text="Agregar noticia"
                    icon={Plus}
                    variant={"default"}
                    className="group"
                    href="/admin/news/add"
                />
            </section>
            <section className="mt-10">
                <p className="text-foreground md:text-base mb-4">
                    Noticias disponibles
                </p>
                {loading ? <TableSkeleton /> : <TableReseources data={response} />}
            </section>
        </>
    )
}