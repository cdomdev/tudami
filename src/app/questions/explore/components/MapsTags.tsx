"use client";

import { useState, useEffect } from "react";
import Tags from "@/content/tags/data-tags.json";
import { CardTags } from "./Cards/CardTags";

export function MapsTags() {
  const [randomTags, setRandomTags] = useState<typeof Tags>([]);

  useEffect(() => {
    const shuffled = [...Tags].sort(() => Math.random() - 0.5).slice(0, 10);
    setRandomTags(shuffled);
  }, []);

  return (
    <article className="hidden lg:flex overflow-hidden flex-wrap justify-center py-2 gap-3">
      {randomTags.map((tag) => (
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
