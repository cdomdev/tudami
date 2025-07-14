"use client";
import { useEffect, useState } from "react";
import { CardPost } from "./components/Cards/CardPost";
import { Pagination } from "@/components/pagination";
import { useSearchParams } from "next/navigation";
import { fetchGeneralQuestions } from "./lib/getQuestionByQuery";
import { SkeletonCard } from "./components/SkeletonPost";
import { Count } from "./components/CountQuestions";
import { NoContent } from "./components/NoContent";
import { SchemaPost } from "./schema/schema.post";

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
    fetchGeneralQuestions(page, pageSize, search)
      .then((res) => {
        setQuestions(res.questions);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize, search]);

  return (
    <>
      <Count count={total} />
      <section className="py-2 mb-8 space-y-6  ">
        {loading ? (
          <SkeletonCard />
        ) : questions.length === 0 ? (
          <NoContent />
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
