import { TagData } from "../../interfaces/interfaces";

export function CardTags(tags: TagData) {
  return (
    <div
      key={tags.id}
      className="inline-flex items-center m-1 px-3 py-1 rounded-full "
      style={{ border: `1px solid ${tags.color || "#6B7280"}` }}
    >
      <span className="text-sm font-medium dark:text-white">{tags.name}</span>
    </div>
  );
}
