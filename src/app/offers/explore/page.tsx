"use client"

import { useSearchParams } from "next/navigation";
import { useState } from "react";
// import { CardPost } from "./components/";
import { SchemaPost } from "../../schemas/schema.post";
import { Main } from "@/components";

export default function PageOferts() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<SchemaPost[]>([]);
    const [total, setTotal] = useState(0);
    const search = searchParams.get("search") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 10;

    return (
        <Main basePath="/explore-questions" count={questions.length} page={page} total={total} pageSize={pageSize} searchParams={searchParams}>
            <p>contenido de ofertas</p>
        </Main>
    )
}