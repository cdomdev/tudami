import { formatJoinDate } from "@/utils/formatDate";
import Link from "next/link";

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

export function CardQuestionUser({
  title,
  created_at,
  question_tags,
  question_comments,
  id,
}: CardQuestionUserProps) {
  const commentsCount = question_comments?.[0]?.count ?? 0;

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 relative mx-10 grid before:absolute before:left-[-36px] before:block before:h-full before:border-l-2 before:border-black/20 dark:before:border-white/15 before:content-[''] md:grid-cols-5 md:gap-1 md:space-x-4">
      <div className="relative pb-5 md:col-span-2">
        <div className="sticky top-0">
          <span className="text-yellow-400 -left-[42px] absolute rounded-full text-5xl">
            •
          </span>
          <Link
            href={`/explore-questions/questions?query=redirect&title=${title
              .replace(/\s+/g, "-")
              .toLowerCase()}&redirect_id=${id}&${new Date().getTime()}`}
            className="text-lg font-semibold text-gray-800 dark:text-white hover:underline"
          >
            <h3 className="text-base leading-4 text-black text-pretty">
              {title}
            </h3>
          </Link>

          <time className="p-0 m-0 text-sm text-gray-600/80 dark:text-white/80">
            {formatJoinDate(created_at)}
          </time>
        </div>
      </div>
      <div className="md:col-span-3 flex flex-col justify-start items-start">
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

        <div className="flex items-center justify-start gap-x-10 mt-2">
          <Link
            href="#"
            role="link"
            className="inline-flex items-center text-base font-medium text-yellow-500 dark:text-yellow-200 dark:hover:text-yellow-300 hover:text-yellow-700"
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
            {commentsCount} comentarios
          </h4>
        </div>
      </div>
    </div>
  );
}
