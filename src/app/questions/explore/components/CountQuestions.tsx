export function Count({ count }: { count: number }) {
  const textForMuchQuestions =
    count === 1 ? "pregunta encontrada" : "preguntas encontradas";
  return (
    <span
      className={`${
        count > 0 ? "block" : "hidden"
      } flex text-muted-foreground items-center`}
    >
      <strong className="text-foreground mr-1 pl-5 text-base">
        {count}
      </strong>
      {textForMuchQuestions}
    </span>
  );
}
