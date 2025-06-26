import { SectionContainer } from "@/components/SectionContainer";
import Editor from "./sections/PageEditor";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear una Pregunta",
  description: "Página para crear nuevas preguntas en Tudami",
};

export default function QuestionsPage() {
  return (
    <>
      <SectionContainer className="md:mt-32 flex justify-center">
        <Editor />
      </SectionContainer>
    </>
  );
}
