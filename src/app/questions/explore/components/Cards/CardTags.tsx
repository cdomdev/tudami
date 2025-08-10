import Link from "next/link";
export interface Tags {
  id: string,
  name: string,
  color: string,
  id_tag?: string,
  slug?: string,
  relevance?: number
}

export function CardTags({ name, id, slug, color }: Tags) {
  return (
    <Link
      href={`/questions/explore/tags?slug=${slug}`}
      key={id}
      className={`inline-flex items-center rounded-full  px-4 py-1 text-sm font-medium shadow-sm transition-transform hover:scale-105 hover:opacity-90 dark:text-white bg-white/10 `}
      style={{ border: `solid 1px ${color}` }}
    >
      {name}
    </Link>
  );
}
