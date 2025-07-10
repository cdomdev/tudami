export function Count({ count }: { count: number }) {
  const textForMuchQuestions =
    count === 1 ? "pregunta encontrada" : "preguntas encontradas";
  return (
    <span
      className={`${
        count > 0 ? "block" : "hidden"
      } text-card-foreground w-full bg-accent dark:bg-[var(--custom-bg)] mb-1 shadow-sm  rounded-sm py-2   `}
    >
      <strong className="text-black dark:text-white mr-2 pl-10 text-base">
        {count}{" "}
      </strong>{" "}
      {textForMuchQuestions}
    </span>
  );
}
