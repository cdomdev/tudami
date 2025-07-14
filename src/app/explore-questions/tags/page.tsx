"use client";
import { useEffect, useState } from "react";
import { Count } from "../components/CountQuestions";
import {SchemaPost} from '../schema/schema.post'
import { useSearchParams } from "next/navigation";
import { getQuestionsByTag } from "../lib/listQuestionsByTags";
import { SkeletonCard } from "../components/SkeletonPost";
import { CardPost } from "../components/Cards/CardPost";

export default function PageTags() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<SchemaPost[]>([]);
  const [total, setTotal] = useState(0);
  const searchParams = useSearchParams();
  const tag = searchParams.get("slug") || "";

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
    <section className="py-8 mb-8 space-y-6">
      <Count count={total} />
      {loading ? (
        <SkeletonCard />
      ) : questions.length === 0 ? (
        <p className="text-center text-accent-foreground block bg-accent p-4 rounded-md">
          Algo salio mal al cargar las preguntas para este tema:  <strong>{tag}</strong>
        </p>
      ) : (
        questions.map((question) => (
          <CardPost key={question.id} {...question} />
        ))
      )}
    </section>
  );
}
