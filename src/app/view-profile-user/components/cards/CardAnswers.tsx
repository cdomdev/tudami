import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { ResponseDataAnswers } from "../../interfaces/interfaces";

export function CardAnswers(answer: ResponseDataAnswers) {
  return (
    <div className="border-b  border-gray-200 dark:border-gray-700 relative  grid before:absolute before:left-[-15px] before:block before:h-full before:border-l-2 before:border-black/20 dark:before:border-white/15 before:content-[''] ">
      <div className="relative  py-3 ">
        <div className="sticky top-0">
          <span className="text-sky-500 -left-[21px] absolute rounded-full text-5xl ">
            •
          </span>
          <h3 className="text-base leading-4 mb-2 text-black dark:text-foreground ">
            {answer.text}
          </h3>

          <time className="p-0 m-0 text-sm text-gray-600/80 dark:text-white/80">
            {format(answer.created_at, "PPP", { locale: es })}
          </time>
        </div>
      </div>
    </div>
  );
}
