"use client";

import Image from "next/image";
interface CardResourcesProps {
  title: string;
  description: string;
  url: string;
  image: string;
}
export function CardResources({
  title,
  description,
  image,
}: CardResourcesProps) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-line/20 transition hover:contrast-110 before:left-1/2 before:bottom-0 before:-translate-x-1/2 before:w-full before:h-full before:bg-black before:absolute before:translate-y-full hover:before:translate-y-1/2 before:-z-10 before:transition before:duration-200 before:mask-t-from-80% has-focus-visible:outline-none has-focus-visible:ring-2 has-focus-visible:ring-brand-blue/20 has-focus-visible:ring-offset-4 has-focus-visible:ring-offset-white has-focus-visible:contrast-110 has-focus-visible:before:translate-y-1/2  flex aspect-video flex-col h-full p-2">
      {" "}
      <div className="absolute top-2 right-2 opacity-100 transition inline-flex items-center gap-2 flex-wrap group-hover:opacity-0 group-hover:-translate-y-1 group-has-focus-visible:opacity-0 group-has-focus-visible:-translate-y-1">
        {" "}
        <span className="rounded-lg bg-line border border-brand-yellow text-brand-yellow grid grid-cols-[auto_1fr]  gap-2 backdrop-blur-xs bg-special-gradient text-xs items-center px-2">
          {" "}
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            ></path>
          </svg>{" "}
          <span className="py-1">Nuevo</span>{" "}
        </span>{" "}
      </div>{" "}
      <Image
        src={image}
        className="absolute inset-0 -z-20 transform-gpu"
        alt={title}
        width="1920"
        height="1080"
      />{" "}
      <div className="opacity-100 flex transition flex-col gap-2 flex-1"> </div>{" "}
      <div className="flex flex-wrap items-end justify-between mt-8 transition  translate-y-1 opacity-0 duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-has-focus-visible:opacity-100 group-has-focus-visible:translate-y-0">
        {" "}
        <h2 className="mt-auto text-shadow-lg text-white leading-snug font-medium text-balance max-w-[28ch] text-sm mb-2 ml-1">
          {" "}
          {title}
        </h2>{" "}
        <div className="flex flex-wrap items-center justify-between w-full">
          {" "}
          <div>
            {" "}
            <div className="flex items-center gap-4 text-sm text-brand-gray flex-wrap">
              {" "}
              <p className="flex items-center gap-1">{description}</p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </article>
  );
}
