import { Hero } from "@/components/sections/home/Hero";
import { SectionContainer } from "@/components/SectionContainer";
import { HowIsWorks } from "@/components/sections/home/HowIsWorks";
import { Histories } from "@/components/sections/home/Histories";
import { FormSubcription } from "@/components/sections/home/FormSubcribtions";
import { FrequentlyQuestions } from "@/components/sections/home/FrequentlyQuiestions";

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
