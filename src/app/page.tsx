import { Hero } from "@/components/sections/Hero";
import { SectionContainer } from "@/components/SectionContainer";
import { HowIsWorks } from "@/components/sections/HowIsWorks";
import { Histories } from "@/components/sections/Histories";
import { FormSubcription } from "@/components/sections/FormSubcribtions";
import { FrequentlyQuestions } from "@/components/sections/FrequentlyQuiestions";

export default function Home() {
  return (
    <>
      <SectionContainer>
        <Hero />
      </SectionContainer>

      <SectionContainer>
        <HowIsWorks />
      </SectionContainer>

      <SectionContainer>
        <Histories />
      </SectionContainer>

      <SectionContainer id="faq">
        <FrequentlyQuestions />
      </SectionContainer>

      <SectionContainer>
        <FormSubcription />
      </SectionContainer>
    </>
  );
}
