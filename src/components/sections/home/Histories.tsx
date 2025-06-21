"use client";

import { CarouselHistories } from "@/components/CarruselHistories";
import { MoveLeft, MoveRight } from "lucide-react";

export function Histories() {
  return (
    <div className="md:px-10  max-w-7xl mx-auto ">
      <div className="mb-6 text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-primary">
          Historias de ayuda entre{" "}
          <strong className="bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
            aprendices
          </strong>
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base text-balance ">
          Conoce cómo otros aprendices lograron superar dificultades gracias al
          apoyo de la comunidad. Estas historias reales muestran el poder de
          colaborar y aprender juntos.
        </p>
        <p className="text-xs gap-1 justify-center  mx-auto text-muted-foreground mt-2 italic flex items-center">
          <MoveLeft size={12} />
          Arrastra para ver más historias
          <MoveRight size={12} />
        </p>
      </div>
      <CarouselHistories />
    </div>
  );
}
