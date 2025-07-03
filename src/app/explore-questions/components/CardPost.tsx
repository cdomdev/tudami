import Image from "next/image";
import { Post } from "../../../interface/post";
import { UserCircle } from "lucide-react";
import { formatTimestamp } from "@/utils/formatDate";
import { LikeSection } from "./LikeSecction";
import { ToggleSaveButton } from "../components/ToggelSaveButton";
export function CardPost({
  id,
  title,
  content,
  created_at,
  question_likes,
  question_tags,
  users,
}: Post) {
  const likeCount = question_likes ? question_likes.length : 0;

  return (
    <article
      key={id}
      className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow transition"
    >
      {/* Cabecera del autor */}
      <div className="flex items-start justify-between mb-3">
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
              {formatTimestamp(created_at)}
            </p>
          </div>
        </div>
        <ToggleSaveButton question_id={id} />
      </div>

      {/* Título y contenido */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <div
          className="text-muted-foreground text-sm"
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

      {/* Acciones */}
      <LikeSection question_id={id} likes={likeCount} />
    </article>
  );
}
