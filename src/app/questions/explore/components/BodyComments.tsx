import { useEffect, useState } from "react";
import { getCommentBy } from "../lib/comment";
import Image from "next/image";
import { formatTimestamp } from "@/utils/formatDate";
import { SchemaComment } from "@/schemas";
import { SkeletonComments } from "./SkeletonComments";
import { BtnLikeResponse } from "./buttons/BtnLikeResponse";

export function BodyComments({ question_id }: { question_id: number }) {
  const [comments, setComments] = useState<SchemaComment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fechDataComment() {
      await getCommentBy(question_id)
        .then((data) => setComments(data.comments))
        .finally(() => setLoading(false));
    }
    fechDataComment();
  }, [question_id]);

  return (
    <div className="flex flex-col space-y-3 ">
      {loading ? (
        <SkeletonComments />
      ) : comments.length === 0 ? (
        <p className="text-center text-sm md:text-base ">
          Esta pregunta no tiene respuestas.
        </p>
      ) : (
        comments.map((com, i) => (
          <div
            key={com.id || i}
            className="border-b p-2 mb-3 overflow-x-hidden"
          >
            <div className="flex mb-2 ">
              <div className="flex-shrink-0">
                <Image
                  src={com.users.avatar_url || ""}
                  alt={com.users.full_name}
                  width={40}
                  height={40}
                  className="rounded-full aspect-square object-cover"
                />
              </div>
              <div className="flex ml-3 flex-col items-start">
                <span className=" font-semibold text-sm md:text-lg">
                  {com.users.full_name}
                </span>
                <p className="text-sm md:text-sm">{com.text}</p>
                <span className="text-xs text-gray-500">
                  Respuesta hace {formatTimestamp(com.created_at.toString())}
                </span>
              </div>
            </div>
            <div className="translate-x-10 space-x-6 flex gap-2 items-center">
              <BtnLikeResponse response_id={com.id} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
