export function Count({ count }: { count: number }) {
  const textForMuchQuestions =
    count === 1 ? "pregunta encontrada" : "preguntas encontradas";
  return (
    <span
      className={`${count > 0 ? "block" : "hidden"
        } text-muted-foreground w-full  p-2  rounded-md bg-background  dark:bg-accent`}
    >
      <strong className="text-black dark:text-white mr-2 pl-10 text-base">
        {count}{" "}
      </strong>{" "}
      {textForMuchQuestions}
    </span>
  );
}
