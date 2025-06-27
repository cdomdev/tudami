interface PostProps {
  id: string;
  author: string;
  authorAvatar?: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
  likesCount: number;
  commentsCount: number;
}
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  MessageSquare,
  Share2,
  UserCircle,
  ThumbsUp,
} from "lucide-react";

export function CardPost({
  author,
  commentsCount,
  content,
  date,
  id,
  likesCount,
  tags,
  title,
  authorAvatar,
}: PostProps) {
  return (
    <article
      key={id}
      className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow transition"
    >
      {/* Cabecera del */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {authorAvatar ? (
              <Image
                src={authorAvatar}
                alt={author}
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
            <p className="font-medium">{author}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>

      {/* Contenido del */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground text-sm">{content}</p>
      </div>

      {/* Etiquetas */}
      <div className="flex flex-wrap gap-2 my-3">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="bg-primary/10 text-primary text-xs px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Acciones */}
      <div className="flex justify-between items-center pt-3 border-t border-border">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{likesCount}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{commentsCount}</span>
          </Button>
        </div>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}
