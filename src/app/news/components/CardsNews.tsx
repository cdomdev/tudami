import { SchemaNews } from "@/schemas";
import { formatJoinDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { BtnLikeNews } from "../components/BtnLikeNews";
import { ArrowRight } from "lucide-react";

export function CardNews({
  title,
  sub_title,
  source,
  image,
  slug,
  id,
  created_at,
}: SchemaNews) {
  return (
    <article className="md:grid grid-cols-6 gap-2 items-center border-b pb-6 hover:bg-muted/50 rounded-xl transition p-5 animate-fade-in-right">
      <div className="col-span-4 space-y-2">
        <h2 className="font-bold text-xl md:text-2xl leading-snug  transition">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base line-clamp-3">
          {sub_title}
        </p>
        <time className="block text-xs text-gray-500 dark:text-gray-400 mb-5 md:mb-0">
          {formatJoinDate(created_at || "")} · {source}
        </time>
      </div>

      <div className="col-span-2">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="w-full h-40 object-cover rounded-lg shadow-sm"
        />
      </div>
      <div className="flex w-full items-center mt-3 gap-x-10 justify-between col-span-5">
        <BtnLikeNews new_id={id} />
        <Link
          href={`/news/details/${slug}`}
          className="group inline-flex items-center gap-2 animate-pulse w-full"
        >
          Ver noticia{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
