import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";

interface CardQuestionUserProps {
  id: string | number;
  title: string;
  slug: string;
  created_at: string;
  aprovel?: string;
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

export function CardQuestionUser({
  title,
  created_at,
  question_tags,
  question_comments,
  slug,
}: CardQuestionUserProps) {
  const commentsCount = question_comments?.[0]?.count ?? 0;

  const commentLabel = commentsCount === 1 ? "comentario" : "comentarios";

  return (
    <div className="border-b  border-gray-200 dark:border-gray-700 relative  grid before:absolute before:left-[-15px] before:block before:h-full before:border-l-2 before:border-black/20 dark:before:border-white/15 before:content-[''] md:grid-cols-5 md:gap-1 md:space-x-4">
      <div className="relative pb-5 md:col-span-2">
        <div className="sticky top-0">
          <span className="text-sky-500 -left-[21px] absolute rounded-full text-5xl ">
            •
          </span>
          <Link
            href={`/questions/explore/q?query=redirect&slug=${slug}`}
            className="text-lg font-semibold text-gray-800 dark:text-white hover:underline"
          >
            <h3 className="text-base leading-4 text-black dark:text-foreground text-pretty">
              {title}
            </h3>
          </Link>

          <time className="p-0 m-0 text-sm text-gray-600/80 dark:text-white/80">
            {format(created_at, "PPP", { locale: es })}
          </time>
        </div>
      </div>
      <div className="md:col-span-3 flex flex-col justify-start items-start">
        <h4 className="text-sm text-gray-600 dark:text-white">Etiquetas:</h4>
        {question_tags?.length > 0 && (
          <div className="flex gap-2 ">
            {question_tags.map(({ tag }) => (
              <span
                key={tag.id}
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold  hover:bg-[${tag.color}20]`}
                style={{
                  borderColor: `${tag.color}20`,
                  border: `1px solid ${tag.color}`,
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-start gap-x-10 my-3 ">
          <Link
            href={`/questions/explore/q?query=redirect&slug=${slug}`}
            role="link"
            className="inline-flex items-center text-base font-medium text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-700 transition-colors"
          >
            Ver pregunta
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 icon icon-tabler icon-tabler-chevron-right"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 6l6 6l-6 6"></path>
            </svg>
          </Link>
          <h4 className="font-semibold text-sm text-gray-600 dark:text-white">
            {commentsCount} {commentLabel}
          </h4>
        </div>
      </div>
    </div>
  );
}
