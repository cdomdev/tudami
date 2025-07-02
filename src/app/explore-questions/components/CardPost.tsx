import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Post } from "../interface/post";
import {
  Bookmark,
  // MessageSquare,
  Share2,
  UserCircle,
  ThumbsUp,
} from "lucide-react";
import { formatTimestamp } from "@/utils/formatDate";
import { ToggleLike } from "./toggle-like";

export function CardPost({
  id,
  title,
  content,
  created_at,
  question_likes,
  question_tags,
  users,
  // comments_count,
}: Post) {

  console.log("Post data:", { id, question_likes, question_tags });
  const likesCount = question_likes?.length ?? 0;
  

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
        <Button variant="ghost" size="icon">
          <Bookmark className="h-5 w-5" />
        </Button>
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
              className="bg-primary/10 text-primary text-xs px-2.5 py-0.5 rounded-full"
            >
              {questionTag.tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Acciones */}
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1 hover:bg-none hover:bg-transparent"
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{likesCount}</span>
      </Button>
      <div className="flex justify-between items-center pt-3 border-t border-border">
        <div className="flex gap-4">
          <ToggleLike question_id={id} />
        </div>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}
