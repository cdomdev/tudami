"use client";

import { CarouselHistories } from "@/components/CarruselHistories";
import { LeafIcon, MoveLeft, MoveRight } from "lucide-react";

export function Histories() {
  return (
    <section className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
          Historias de ayuda entre aprendices
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
          Conoce cómo otros aprendices lograron superar dificultades gracias al apoyo
          de la comunidad. Estas historias reales muestran el poder de colaborar y
          aprender juntos.
        </p>
        <p className="text-xs gap-1 justify-center  mx-auto text-muted-foreground mt-2 italic flex items-center">
          <MoveLeft size={12}/>
          Arrastra para ver más historias 
          <MoveRight size={12}/>
        </p>
      </div>

      <CarouselHistories />
    </section>
  );
}
