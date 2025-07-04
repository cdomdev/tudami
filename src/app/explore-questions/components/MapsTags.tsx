import Tags from "@/content/data-tags.json";
import { CardTags } from "./CardTags";

export function MapsTags() {
  return (
    <article className="flex flex-wrap gap-3">
      {Tags.slice(0, 10).map((tag) => (
        <CardTags key={tag.id} color={tag.color} name={tag.name} id={tag.id} slug={tag.slug} />
      ))}
    </article>
  );
}
