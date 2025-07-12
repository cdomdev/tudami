export function Count({ count }: { count: number }) {
  const textForMuchQuestions =
    count === 1 ? "pregunta encontrada" : "preguntas encontradas";
  return (
    <span
      className={`${
        count > 0 ? "block" : "hidden"
      } text-muted-foreground w-full   `}
    >
      <strong className="text-foreground mr-2 pl-5 text-base">
        {count}{" "}
      </strong>{" "}
      {textForMuchQuestions}
    </span>
  );
}
