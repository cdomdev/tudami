"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getPopularQuestions,
  getUnansweredQuestions,
  getMyQuestions,
  getQuestionsById
} from "../lib/getQuestionByQuery";
import { SchemaPost } from "../schema/schema.post";
import { SkeletonCard } from "../components/SkeletonPost";
import { CardPost } from "../components/Cards/CardPost";
import { Count } from "../components/CountQuestions";
import { Pagination } from "@/components/pagination";

export default function QuestionPage({}: { params: { query: string } }) {
  const [questions, setQuestions] = useState<SchemaPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || undefined;
  const search = searchParams.get("search") || undefined;
  const id = searchParams.get("redirect_id") || undefined;


  const pageSize = 10;
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);

      let data = [];

      switch (query) {
        case "popular":
          data = await getPopularQuestions(page, pageSize, search);
          break;
        case "unanswered":
          data = await getUnansweredQuestions(page, pageSize, search);
          break;
        case "redirect":
          data = await getQuestionsById(page, pageSize, search, id);
          break;
        case "my":
          data = await getMyQuestions(page, pageSize, search);
          break;
        default:
          data = [];
      }

      setQuestions(data);
      setTotal(data.length);
      setLoading(false);
    };

    fetchQuestions();
  }, [page, search, query, id]);

  console.log("Questions fetched:", questions);
  
  return (
    <>
      <section className="py-8 mb-8 space-y-6">
        <Count count={questions.length} />
        {loading ? (
          <SkeletonCard />
        ) : questions.length === 0 ? (
          <p className="text-center">No hay preguntas.</p>
        ) : (
          questions.map((post) => <CardPost key={post.id} {...post} />)
        )}
      </section>
      <Pagination
        currentPage={page}
        totalItems={total}
        pageSize={pageSize}
        basePath="/explore-questions"
        searchParams={searchParams}
      />
    </>
  );
}
