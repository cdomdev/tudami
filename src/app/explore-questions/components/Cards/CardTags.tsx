import Link from "next/link";
import { Tags } from "@/interface/tags";

export function CardTags({ name, id, slug }: Tags) {
  return (
    <Link
      href={`/explore-questions/tags?slug=${slug}`}
      key={id}
      className={`inline-flex items-center rounded-full border-0 bg-white border-gray-50 px-4 py-1 text-sm font-medium shadow-sm transition-transform hover:scale-105 hover:opacity-90 dark:text-black dark:bg-gray-50`}
    >
      {name}
    </Link>
  );
}
