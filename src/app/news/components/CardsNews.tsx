import { SchemaNews } from "@/schemas";
import { formatJoinDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";

export function CardNews({
  title,
  sub_title,
  source,
  image,
  slug,
  created_at,
}: SchemaNews) {
  return (
    <Link
      href={`/news/details/${slug}`}
    >
      <article className="grid grid-cols-6 gap-4 items-center border-b pb-6 hover:bg-muted/50 rounded-xl transition p-5">
        <div className="col-span-4 space-y-2">
          <h2 className="font-bold text-xl md:text-2xl leading-snug  transition">
            {title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base line-clamp-3">
            {sub_title}
          </p>
          <time className="block text-xs text-gray-500 dark:text-gray-400">
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
      </article>
    </Link>
  );
}
