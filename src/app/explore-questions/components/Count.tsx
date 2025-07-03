export function Count({ count }: { count: number }) {
  const textForMuchQuestions = count === 1 ? "pregunta encontrada" : "preguntas encontradas";
  return (
    <span className={`${count > 0 ? "block" : "hidden"} text-muted-foreground bg-accent dark:bg-card w-full  p-2  rounded-md`}>
      <strong className="text-black pl-10 text-base">{count} </strong> {textForMuchQuestions}
    </span>
  );
}