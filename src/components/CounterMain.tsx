export function Count({ count, type }: { count: number; type?: string }) {
  const textForMuchQuestions =
    count === 1 ? "pregunta encontrada" : "preguntas encontradas";
  const textForMainOffers =
    count === 1 ? "oferta encontrada" : "ofertas encontradas";
  const textRender =
    type === "offers" ? textForMainOffers : textForMuchQuestions;
  return (
    <span
      className={`${
        count > 0 ? "block" : "hidden"
      } flex text-muted-foreground items-center`}
    >
      <strong className="text-foreground mr-1 pl-5 text-base">{count}</strong>
      {textRender}
    </span>
  );
}
