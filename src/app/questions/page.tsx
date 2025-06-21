import { SectionContainer } from "@/components/SectionContainer";
import Editor from "@/components/sections/questions/Editor";

export default function QuestionsPage() {
  return (
    <>
      <SectionContainer className="md:mt-32 flex justify-center">
        <Editor />
      </SectionContainer>
    </>
  );
}
