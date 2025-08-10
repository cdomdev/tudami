"use client";
import { useEffect, useState } from "react";
import { SchemaPost } from "@/schemas";
import { useRouter, useSearchParams } from "next/navigation";
import { getQuestionsByTagApi } from "../lib/getQuestions";
import { CardPost } from "../components/Cards/CardPost";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Main, SkeletonCard } from "@/components";

export default function PageTags() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<SchemaPost[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tag = searchParams.get("slug") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  function clearTag() {
    router.push("/questions/explore");
  }

  useEffect(() => {
    setLoading(true);
    async function fetchQuestions() {
      const data = await getQuestionsByTagApi(tag, 1, 10);
      if (data) {
        setQuestions(data);
        setTotal(data.length);
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [tag]);

  return (
    <>
      <Main
        basePath="/explore-questions"
        count={questions.length}
        page={page}
        total={total}
        pageSize={pageSize}
        searchParams={searchParams}
      >
        <div className="flex gap-x-2 justify-end self-end">
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
        {loading ? (
          <SkeletonCard />
        ) : questions.length === 0 ? (
          <div className="flex flex-col p-10">
            <p className="text-center text-accent-foreground block rounded-md">
              No se encontraron preguntas relacionadas al tema seleccionado.
            </p>
            <strong className="text-center text-lg mb-5 bg-gradient-to-bl from-indigo-500 to-sky-300 text-transparent bg-clip-text">
              ¡Sé el primero en preguntar!
            </strong>
            <Button asChild className="mx-auto group w-fit">
              <Link href="/questions/create" className="flex items-center">
                <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                Nueva pregunta
              </Link>
            </Button>
          </div>
        ) : (
          questions.map((question) => (
            <CardPost key={question.id} {...question} />
          ))
        )}
      </Main>
    </>
  );
}
