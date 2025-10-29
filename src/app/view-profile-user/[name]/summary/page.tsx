"use client";
import { useEffect, useState } from "react";
import {
  getQuestionUserBy,
  getAnswerUserBy,
  getTagsUserBy,
} from "../../lib/profile";
import { useSearchParams } from "next/navigation";
import { SkeletonCardQuestionUser } from "../../components/SkeletonCardQuestionUser";
import {
  CardQuestionUserProps,
  ResponseDataAnswers,
  TagData,
} from "../../interfaces/interfaces";

import {
  CardTags,
  CardAnswers,
  CardQuestionUser,
} from "../../components/cards";

export default function SummaryPage() {
  const [resAnswers, setAnswers] = useState<ResponseDataAnswers[]>([]);
  const [resQuestions, setQuestions] = useState<CardQuestionUserProps[]>([]);
  const [resTags, setResTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [count, setCount] = useState(0);
  const userId = searchParams.get("u_view_profile_p") || undefined;
  const query = searchParams.get("q") || undefined;
  const aprovelToken = searchParams.get("aprov") || undefined;

  useEffect(() => {
    async function getDataUserByParamas() {
      if (!userId) return;
      let response = [];
      try {
        switch (query) {
          case "questions":
            setLoading(true);
            response = await getQuestionUserBy(userId, aprovelToken);
            setQuestions(response.data);
            break;
          case "answers":
            setLoading(true);
            response = await getAnswerUserBy(userId, aprovelToken);
            setAnswers(response.data);
            break;
          case "tags":
            setLoading(true);
            response = await getTagsUserBy(userId, aprovelToken);
            setResTags(response.data);
            break;
          default:
            response = [];
            break;
        }

        setCount(response.data.length);
      } catch (error) {
        console.error("Erro fetch data", error);
      } finally {
        setLoading(false);
      }
    }

    getDataUserByParamas();
  }, [userId, query, aprovelToken]);

  let title = "";
  switch (query) {
    case "questions":
      title = count > 0 ? `${count} Pregunta` : `${count} Preguntas`;
      break;
    case "answers":
      title = count > 0 ? `${count} Respuesta` : `${count} Respuestas`;
      break;
    case "tags":
      title = count > 1 ? `${count} Etiquetas` : `${count} Etiqueta`;
      break;
  }

  let renderedContent = null;
  if (query === "questions" && resQuestions && resQuestions.length > 0) {
    renderedContent = resQuestions.map((question) => (
      <CardQuestionUser
        id={question.id}
        slug={question.slug}
        aprovel={aprovelToken}
        key={question.id.toString()}
        created_at={question.created_at}
        title={question.title}
        question_tags={question.question_tags}
        question_comments={question.question_comments}
      />
    ));
  } else if (query === "answers" && resAnswers && resAnswers.length > 0) {
    renderedContent = resAnswers.map((answer) => (
      <CardAnswers key={answer.id} {...answer} />
    ));
  } else if (query === "tags" && resTags && resTags.length > 0) {
    renderedContent = resTags.map((tag) => <CardTags key={tag.id} {...tag} />);
  }

  return (
    <>
      <h3 className="text-xl font-bold mb-4"> {title}</h3>
      {loading ? (
        <SkeletonCardQuestionUser />
      ) : renderedContent ? (
        <div className={query === "tags" ? "flex flex-wrap gap-2" : ""}>
          {renderedContent}
        </div>
      ) : (
        <p className="text-center py-4 text-gray-500">
          No hay{" "}
          {query === "questions"
            ? "preguntas"
            : query === "answers"
              ? "respuestas"
              : "etiquetas"}{" "}
          disponibles.
        </p>
      )}
    </>
  );
}
