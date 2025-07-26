"use client";
import { useEffect, useState } from "react";
import { getQuestionUserBy } from "../../lib/profile";
import { useSearchParams } from "next/navigation";
import { CardQuestionUser } from "../../components/CardQuestionUser";

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
}

export default function SummaryPage() {
  const [resParams, setParams] = useState<CardQuestionUserProps[]>([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get("u_view_profile_p") || undefined;
  const query = searchParams.get("q") || undefined;

 useEffect(() => {
  async function getDataUserByParamas() {
    if (!userId) return;

    let response;
    switch (query) {
      case "questions":
        response = await getQuestionUserBy(userId);
        break;
      default:
        response = { success: true, data: [] };
        break;
    }

    // Verifica que response tenga el formato correcto
    if (response?.success && Array.isArray(response.data)) {
      setParams(response.data);
    } else {
      setParams([]); // fallback en caso de error o formato inesperado
    }
  }

  getDataUserByParamas();
}, [userId, query]);

  let title = "";
  switch (query) {
    case "questions":
      title = `Preguntas`;
      break;
  }

  console.log(" tipo de res --_>", resParams);
  return (
    <>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {resParams && Array.isArray(resParams) && resParams.length > 0 ? (
        resParams.map((question) => (
          <CardQuestionUser
            id={question.id}
            key={question.title}
            created_at={question.created_at}
            title={question.title}
            question_tags={question.question_tags}
            question_comments={question.question_comments}
          />
        ))
      ) : (
        <p>No hay datos disponibles.</p>
      )}
    </>
  );
}
