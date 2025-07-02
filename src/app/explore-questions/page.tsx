"use client";
import { useEffect, useState } from "react";
import { CardPost } from "./components/CardPost";
import { Pagination } from "./components/pagination";
import { useSearchParams } from "next/navigation";
import { fetchQuestions } from "./lib/listQuestions";
import { Post } from "./interface/post";
import { SkeletonCard } from "./components/skeleton-post";

export default function ExploreQuestionsPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const topic = searchParams.get("topic") || undefined;
  const search = searchParams.get("search") || undefined;
  const pageSize = 10; // Definir pageSize constante

  const sortParam = searchParams.get("sort");
  const validSortValues = ["recent", "popular", "commented"] as const;

  const sort: (typeof validSortValues)[number] | undefined =
    validSortValues.includes(sortParam as (typeof validSortValues)[number])
      ? (sortParam as (typeof validSortValues)[number])
      : "recent";

  useEffect(() => {
    setLoading(true);
    fetchQuestions({ page, topic, sort, search, pageSize })
      .then((res) => {
        console.log("fetchQuestions response:", res);
        setQuestions(res.questions);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [page, topic, sort, search, pageSize]);

  console.log("Page state:", { loading, total, questionsLength: questions.length });


  return (
    <>
      <section className="py-8 mb-8 space-y-6">
        {loading ? (
          <SkeletonCard/>
        ) : (
          questions.map((post) => (
            <CardPost
              key={post.id}
              user_id={post.user_id}
              id={post.id}
              users={post.users}
              content={post.content}
              created_at={post.created_at}
              question_tags={post.question_tags}
              title={post.title}
              question_likes={post.question_likes}
              // comments_count={post.comments_count}
            />
          ))
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
