"use client";
import { useEffect, useState } from "react";
import { Count } from "../components/CountQuestions";
import { SchemaPost } from "../schema/schema.post";
import { useRouter, useSearchParams } from "next/navigation";
import { getQuestionsByTag } from "../lib/getQuestions";
import { SkeletonCard } from "../components/SkeletonPost";
import { CardPost } from "../components/Cards/CardPost";
import { X } from "lucide-react";

export default function PageTags() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<SchemaPost[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tag = searchParams.get("slug") || "";

  function clearTag() {
    router.push("/explore-questions");
  }

  useEffect(() => {
    setLoading(true);
    async function fetchQuestions() {
      const data = await getQuestionsByTag(tag, 1, 10);
      if (data) {
        setQuestions(data);
        setTotal(data.length);
      }
    }

    fetchQuestions();
    setLoading(false);
  }, [tag]);

  return (
    <>
      <section className="flex gap-x-20">
        <Count count={total} />
        <div className="flex gap-x-2 ">
          <p className=" text-base text-foreground">
            Preguntas relacionadas con:
          </p>
          <span className=" relative inline-flex items-center rounded-full border-0 bg-white border-gray-50 px-4 py-1 text-sm font-medium shadow-sm transition-transform   dark:text-black dark:bg-gray-50">
            <X
              className="absolute -right-1 -top-3 border  size-[16px] p-0.5  bg-gray-400 rounded-full mt-1 ml-1 cursor-pointer transition duration-300 hover:text-gray-100"
              onClick={clearTag}
            />
            {tag}
          </span>
        </div>
      </section>
      <section className="py-2 mb-8 space-y-6">
        {loading ? (
          <SkeletonCard />
        ) : questions.length === 0 ? (
          <p className="text-center text-accent-foreground block bg-accent p-4 rounded-md">
            No se encontraron preguntas relacionadas con:{" "}
            <strong className="ml-2">{tag}</strong>
          </p>
        ) : (
          questions.map((question) => (
            <CardPost key={question.id} {...question} />
          ))
        )}
      </section>
    </>
  );
}
