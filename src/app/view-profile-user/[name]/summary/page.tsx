"use client";
import { useEffect, useState } from "react";
import {
  getQuestionUserBy,
  getAnswerUserBy,
  getTagsUserBy,
} from "../../lib/profile";
import { useSearchParams } from "next/navigation";
import { CardQuestionUser } from "../../components/CardQuestionUser";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { SkeletonCardQuestionUser } from "../../components/SkeletonCardQuestionUser";
interface CardQuestionUserProps {
  id: string | number;
  title: string;
  created_at: string;
  question_tags: {
    tag: {
      id: number;
      name: string;
      color: string;
    };
  }[];
  question_comments?: {
    count: number;
  }[];
  user: {
    id: string | number;
    full_name: string;
  };
}

export default function SummaryPage() {
  const [resAnswers, setAnswers] = useState<CardQuestionUserProps[]>([]);
  const [resQuestions, setQuestions] = useState<CardQuestionUserProps[]>([]);
  const [resTags, setResTags] = useState<CardQuestionUserProps[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [count, setCount] = useState(0);
  const userId = searchParams.get("u_view_profile_p") || undefined;
  const query = searchParams.get("q") || undefined;

  useEffect(() => {
    async function getDataUserByParamas() {
      if (!userId) return;

      let response;
      switch (query) {
        case "questions":
          setLoading(true);
          response = await getQuestionUserBy(userId);
          setQuestions(response.data);
          setCount(response.data.length);
          setLoading(false);
          break;
        case "answers":
          setLoading(true);
          response = await getAnswerUserBy(userId);
          setAnswers(response.data);
          setCount(response.data.length);
          setLoading(false);
          break;
        case "tags":
          setLoading(true);
          response = await getTagsUserBy(userId);
          setResTags(response.data);
          setCount(response.data.length);
          setLoading(false);
          break;
        default:
          response = { success: true, data: [] };
          break;
      }

      setLoading(false);
    }

    getDataUserByParamas();
  }, [userId, query]);

    console.log("resParams:", resQuestions, resAnswers, resTags);

  let title = "";
  switch (query) {
    case "questions":
      title = count > 0 ? `${count} Pregunta` : `Preguntas`;
      break;
    case "answers":
      title = count > 0 ? `${count} Respuesta` : `Respuestas`;
      break;
    case "tags":
      title = `Etiquetas`;
      break;
  }

  let renderedContent = null;
  if (query === "questions") {
    renderedContent = resQuestions.map((question) => (
      <CardQuestionUser
        id={question.id}
        key={question.title}
        created_at={question.created_at}
        title={question.title}
        question_tags={question.question_tags}
        question_comments={question.question_comments}
      />
    ));
  } else if (query === "answers") {
    renderedContent = resAnswers.map((answer) => (
      <div className="p-2  rounded-md" key={answer.id}>
        <p className="md:text-base text-foreground">{answer.title}</p>
        <span className="inline-flex text-sm text-gray-500 dark:text-gray-400 border-b w-full pr-20">
            {" "}
            respondio el {format(answer.created_at, "PPP", { locale: es })}
          </span>
      </div>
    ));
  } else if (query === "tags") {
    renderedContent = resTags.map((tag) => (
      <p key={tag.id}>
        {tag.question_tags.map((t) => t.tag.name).join(", ")}
      </p>
    ));
  }

  return (
    <>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {loading ? (
        <SkeletonCardQuestionUser />
      ) : resQuestions && Array.isArray(resQuestions) && resQuestions.length > 0 ? (
        renderedContent
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </>
  );
}
