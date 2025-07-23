import Image from "next/image";
import { UserCircle } from "lucide-react";
import { formatTimestamp } from "@/utils/formatDate";
import { FooterCardPost } from "./FooterCardPost";
import { ButtonSavePost } from "../buttons/ButtonSavePost";
import { ButtonShare } from "../buttons/ButtonShare";
import { SchemaPost } from "../../schema/schema.post";
import Link from "next/link";

import { useSession } from "@/context/context.sesion";

export function CardPost({
  content,
  question_comments,
  created_at,
  id,
  question_likes,
  question_tags,
  users,
  title,
}: SchemaPost) {
  const likeCount = question_likes ? question_likes.length : 0;
  const commentCount = question_comments ? question_comments.length : 0;

  const { user } = useSession();

  const approvalToken = user?.approval_token || "";

  return (
    <article
      key={id}
      className="bg-card dark:bg-custom-card border border-border rounded-sm p-5 shadow-sm hover:shadow transition"
    >
      {/* Cabecera del autor */}
      <div className="flex items-start justify-between mb-3">
        <Link href={`/view-profile-user/${users.full_name}?u_view_profile_p=${users?.id}&aprov=${approvalToken}`} className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {users?.avatar_url ? (
                <Image
                  src={users.avatar_url}
                  alt={users.full_name}
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium">{users?.full_name || "Anónimo"}</p>
              <p className="text-xs text-muted-foreground">
                {formatTimestamp(created_at.toString())}
              </p>
            </div>
          </div>
        </Link>
        <div className="flex gap-5 items-center">
          <ButtonShare title="Comparte esta pregunta" />
          <ButtonSavePost question_id={id} />
        </div>
      </div>

      {/* Título y contenido */}
      <div className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold mb-2">{title}</h2>
        <div
          className="text-black dark:text-foreground text-pretty text-sm md:text-md "
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      {/* Etiquetas */}
      {question_tags && question_tags.length > 0 && (
        <div className="flex flex-wrap gap-2 my-4">
          {question_tags.map((questionTag) => (
            <span
              key={questionTag.tag.id}
              className={`text-xs px-2.5 py-0.5 rounded-full  text-gray-50 font-normal`}
              style={{ backgroundColor: `${questionTag.tag.color}` }}
            >
              {questionTag.tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Acciones botones y contadores de los preguntas */}
      <FooterCardPost
        question_id={id}
        likes={likeCount}
        comments={commentCount}
      />
    </article>
  );
}
