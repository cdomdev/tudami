import Editor from "./components/Editor";
import { Metadata } from "next";
import { Recomendaciones } from "./components/Recomendaciones";

export const metadata: Metadata = {
  title: "Hacer una Pregunta",
  description: "Página para hacer nuevas preguntas en Tudami",
};

export default function QuestionsPage() {
  return (
    <>
      <h1 className="relative md:-left-1/4 mb-2 mt-24 md:mt-30 text-center font-medium  text-2xl md:text-3xl text-primary">
        ¿En qué necesitas ayuda?
      </h1>
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 px-2">
        <article className="md:col-span-4 px w-full shadow-sm order-2 lg:order-1 dark:bg-custom-card rounded-sm">
          <Editor />
        </article>
        <article className="md:col-span-2 p-6 shadow-sm dark:bg-custom-card rounded-sm order-1 lg:order-2">
          <Recomendaciones />
        </article>
      </section>
    </>
  );
}
