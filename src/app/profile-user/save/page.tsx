"use client";

import { useSearchParams } from "next/navigation";
import { getSavedQuestions } from "../lib/profile";
import { useEffect, useState } from "react";
import { CardsQuestionSaves } from "../components/cards/CardsQuestionSaves";
import { SchemaQuestionsSaveds } from "../schema/schema.questions_saveds";

export default function SavePage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("user_id");
  const [savedQuestions, setSavedQuestions] = useState<SchemaQuestionsSaveds[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      await getSavedQuestions(userId)
        .then(({ data }) => {
          setSavedQuestions((data || []) as SchemaQuestionsSaveds[]);
        })
        .catch((error) => {
          console.error("Error fetching saved questions:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, [userId]);

  return (
    <section className="p-6 dark:bg-custom-card  shadow-sm rounded-sm">
      {loading && (
        <p className="text-foreground text-center">
          Cargando preguntas guardadas...
        </p>
      )}
      {!loading && savedQuestions.length === 0 && (
        <p className="text-foreground text-center">
          No hay preguntas guardadas.
        </p>
      )}
      {!loading && savedQuestions.length > 0 && (
        <>
          <h2 className="text-lg font-normal mb-4 border-b pb-1">
            Estas son tus preguntas guardadas
          </h2>
          <div className="space-y-4">
            {savedQuestions.map((question) => (
              <CardsQuestionSaves key={question.id} {...question} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
