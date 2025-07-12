import Tags from "@/content/tags/data-tags.json";
import { CardTags } from "./Cards/CardTags";

export function MapsTags() {
  return (
    <article className="flex flex-wrap justify-center gap-3 ">
      {Tags.slice(0, 10).map((tag) => (
        <CardTags
          key={tag.id}
          color={tag.color}
          name={tag.name}
          id={tag.id}
          slug={tag.slug}
        />
      ))}
    </article>
  );
}
