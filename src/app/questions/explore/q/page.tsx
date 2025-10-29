"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getPopularQuestionsApi,
  getUnansweredQuestionsApi,
  getMyQuestionsApi,
  getQuestionsBySlugApi,
} from "../lib/getQuestions";
import { SchemaPost } from "@/schemas";
import { CardPost } from "../components/Cards/CardPost";
import { Main, SkeletonCard } from "@/components";
import { NoContent } from "@/components";

export default function QuestionPage() {
  const [questions, setQuestions] = useState<SchemaPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || undefined;
  const search = searchParams.get("search") || undefined;
  const slug = searchParams.get("slug") || undefined;

  const pageSize = 10;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const dataCount = questions.length;

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);

      let data = [];

      switch (query) {
        case "popular":
          data = await getPopularQuestionsApi(page, pageSize, search);
          break;
        case "unanswered":
          data = await getUnansweredQuestionsApi(page, pageSize, search);
          break;
        case "redirect":
          data = await getQuestionsBySlugApi(page, pageSize, search, slug);
          break;
        case "my":
          data = await getMyQuestionsApi(page, pageSize, search);
          break;
        default:
          data = [];
      }

      setQuestions(data);
      setTotal(data.length);
      setLoading(false);
    };

    fetchQuestions();
  }, [page, search, query, slug]);

  return (
    <Main
      basePath="/questions/explore"
      count={dataCount}
      page={page}
      total={total}
      pageSize={pageSize}
      searchParams={searchParams}
    >
      {loading ? (
        <SkeletonCard mockNumber={5} />
      ) : questions.length === 0 ? (
        <NoContent
          text="No hay preguntas disponibles"
          url="/questions/explore"
          url_redirect="/questions/explore"
          text_btn="Crear pregunta"
        />
      ) : (
        questions.map((post, i) => <CardPost key={post.id || i} {...post} />)
      )}
    </Main>
  );
}
