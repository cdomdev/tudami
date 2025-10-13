"use client";

import { SchemaResoucesResponse } from "@/schemas";
import Image from "next/image";
import { BookLock, BookOpen } from "lucide-react";
export function CardResources({
  description,
  title,
  url_image,
  type,
  category,
}: SchemaResoucesResponse) {
  const getImage = () => {
    if (url_image) return url_image;
    switch (category) {
      case "cursos":
        return "/resources/default-courses.webp";
      case "tools":
        return "/resources/default-tools.webp";
      case "documentation":
        return "/resources/default-documentation.webp";
      default:
        return "/resources/default-generic.webp";
    }
  };

  const iconCard =
    type === "free" ? (
      <BookOpen className="w-3 h-3" />
    ) : (
      <BookLock className="w-3 h-3" />
    );

  const textBabge = type === "free" ? "Gratis" : "Pago";

  return (
    <article className="group relative overflow-hidden rounded-xl border border-line/20 transition hover:contrast-110 before:left-1/2 before:bottom-0 before:-translate-x-1/2 before:w-full before:h-full before:bg-black before:absolute before:translate-y-full hover:before:translate-y-1/12 before:-z-10 before:transition before:duration-200 before:mask-t-from-80% has-focus-visible:outline-none has-focus-visible:ring-2 has-focus-visible:ring-brand-blue/20 has-focus-visible:ring-offset-4 has-focus-visible:ring-offset-white has-focus-visible:contrast-110 has-focus-visible:before:translate-y-1/2  flex aspect-video flex-col h-full p-2 animate-slide-in-top">
      {" "}
      <div className="absolute top-2 right-2 opacity-100 transition inline-flex items-center gap-2 flex-wrap group-hover:opacity-0 group-hover:-translate-y-1 group-has-focus-visible:opacity-0 group-has-focus-visible:-translate-y-1">
        {" "}
        <span className="rounded-lg bg-line border border-amber-200 text-brand-yellow grid grid-cols-[auto_1fr]  gap-2 backdrop-blur-xs bg-special-gradient text-xs text-white dark:text-foreground items-center px-2">
          {" "}
          {iconCard}
          <span className="py-1">{textBabge}</span>{" "}
        </span>{" "}
      </div>{" "}
      <Image
        src={url_image || getImage()}
        className="absolute inset-0 -z-20 transform-gpu"
        alt={title}
        width="1920"
        height="1080"
        loading="lazy"
      />{" "}
      <div className="opacity-100 flex transition flex-col gap-2 flex-1"> </div>{" "}
      <div className="flex flex-wrap items-end justify-between mt-8 transition  translate-y-1 opacity-0 duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-has-focus-visible:opacity-100 group-has-focus-visible:translate-y-0">
        {" "}
        <h2 className="mt-auto text-shadow-lg text-white dark:text-foreground leading-snug font-medium text-balance max-w-[28ch] text-sm mb-2 ml-1 ">
          {" "}
          {title}
        </h2>{" "}
        <div className="flex flex-wrap items-center justify-between w-full">
          {" "}
          <div>
            {" "}
            <div className="flex items-center gap-4 text-sm text-brand-gray flex-wrap">
              <p className="line-clamp-3">
                <span className="align-middle text-white dark:text-foreground">
                  {description}
                </span>
              </p>
            </div>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </article>
  );
}
