"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getPopularQuestions,
  getUnansweredQuestions,
  getMyQuestions,
} from "../lib/getQuestionByQuery";
import { Post } from "../../../interface/post";
import { SkeletonCard } from "../components/SkeletonPost";
import { CardPost } from "../components/CardPost";
import { Count } from "../components/Count";
import { Pagination } from "@/components/pagination";

export default function QuestionPage({}: { params: { query: string } }) {
  const [questions, setQuestions] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const query = searchParams.get("query") || undefined;

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
  }, [page, search, query]);

  return (
    <>
      <section className="py-8 mb-8 space-y-6">
        <Count count={questions.length} />
        {loading ? (
          <SkeletonCard />
        ) : questions.length === 0 ? (
          <p className="text-center">No hay preguntas.</p>
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
