import { Hero } from "@/components/sections/Hero";
import { SectionContainer } from "@/components/SectionContainer";
import { HowIsWorks } from "@/components/sections/HowIsWorks";
import { Histories } from "@/components/sections/Histories";
import { Subcription } from "@/components/sections/Subcribtions";

export default function Home() {
  return (
    <>
      <SectionContainer>
        <Hero />
      </SectionContainer>
      
      <SectionContainer>
        <HowIsWorks/>
      </SectionContainer>

       <SectionContainer>
        <Histories/>
      </SectionContainer>
      
       <SectionContainer>
       <Subcription/>
      </SectionContainer>
    </>
  );
}
