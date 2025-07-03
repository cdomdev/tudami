import { Hero } from "@/app/sections/Hero";
import { SectionContainer } from "@/components/SectionContainer";
import { HowIsWorks } from "@/app/sections/HowIsWorks";
import { Histories } from "@/app/sections/Histories";
import { FormSubcription } from "@/app/sections/FormSubcribtions";
import { FrequentlyQuestions } from "@/app/sections/FrequentlyQuiestions";

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
