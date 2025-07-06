import { SectionContainer } from "@/components/SectionContainer";
import Editor from "./sections/PageEditor";
import { Metadata } from "next";
import { Recomendaciones } from "./sections/Recomendaciones";

export const metadata: Metadata = {
  title: "Hacer una Pregunta",
  description: "Página para hacer nuevas preguntas en Tudami",
};

export default function QuestionsPage() {
  return (
    <>
      <h1 className="mt-28 text-center font-medium -mb-10 text-xl md:text-2xl text-primary">
        ¿En qué necesitas ayuda?
      </h1>
      <SectionContainer className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-4">
        <Editor />
        <div className="md:col-span-2  rounded-md p-6 bg-muted shadow-sm order-1 lg:order-2">
          <Recomendaciones />
        </div>
      </SectionContainer>
    </>
  );
}
