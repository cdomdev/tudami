"use client";
import { useEffect, useState } from "react";
import { CardPost } from "./components/Cards/CardPost";
import { useSearchParams } from "next/navigation";
import { fetchGeneralQuestionsApi } from "./lib/getQuestions";
import { NoContent } from "../../../components/NoContent";
import { SchemaPost } from "@/schemas";
import { Main, SkeletonCard } from "@/components";

export default function ExploreQuestionsPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<SchemaPost[]>([]);
  const [total, setTotal] = useState(0);
  const search = searchParams.get("search") || undefined;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    fetchGeneralQuestionsApi(page, pageSize, search)
      .then((res) => {
        setQuestions(res.questions);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, search]);


  return (
    <Main
      basePath="/questions/explore"
      count={questions.length}
      page={page}
      total={total}
      pageSize={pageSize}
      searchParams={searchParams}
    >
      {loading ? (
        <SkeletonCard mockNumber={5} />
      ) : questions.length === 0 ? (
        <NoContent text="No hay preguntas disponibles" url="/questions/create" url_redirect="/questions/explore" text_btn="Crear pregunta"/>
      ) : (
        questions.map((post) => <CardPost key={post.id} {...post} />)
      )}
    </Main>
  );
}
