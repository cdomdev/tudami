"use client";
import { useEffect, useState } from "react";
import { CardPost } from "./components/Cards/CardPost";
import { Pagination } from "@/components/pagination";
import { useSearchParams } from "next/navigation";
import { fetchGeneralQuestions } from "./lib/listQuestions";
import { Post } from "../../interface/post";
import { SkeletonCard } from "./components/SkeletonPost";
import { Count } from "./components/CountQuestions";
import { NoContent } from "./components/NoContent";

export default function ExploreQuestionsPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    fetchGeneralQuestions(page, pageSize)
      .then((res) => {
        setQuestions(res.questions);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  return (
    <>
      <section className="py-8 mb-8 space-y-6">
        <Count count={total} />
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
