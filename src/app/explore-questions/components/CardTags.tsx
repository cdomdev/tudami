import Link from "next/link";
import { Tags } from "@/interface/tags";

export function CardTags({ name, color, id, slug }: Tags) {
  return (
    <Link
      href={`/explore-questions/tags?tag_slug=${slug}`}
      key={id}
      className={`inline-flex items-center rounded-full border px-4 py-1 text-sm font-medium shadow-sm transition-transform hover:scale-105 hover:opacity-90`}
      style={{ backgroundColor: color, color: "#fff", borderColor: color }}
    >
      {name}
    </Link>
  );
}
