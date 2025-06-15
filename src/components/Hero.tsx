"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

const palabras = [
  "hacer preguntas",
  "solicitar ayuda",
  "ofrecer ayuda",
  "colaborar con otros",
];

export function Hero() {
  const textoRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const animateTexto = () => {
      // Fade out
      gsap.to(textoRef.current, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          // Cambiar palabra después del fade out
          setIndex((prev) => (prev + 1) % palabras.length);

          // Esperar un poco antes del fade in
          setTimeout(() => {
            gsap.to(textoRef.current, { opacity: 1, duration: 0.6 });
          }, 100);
        },
      });

      // Repetir cada 3.5 segundos
      timeoutId = setTimeout(animateTexto, 3500);
    };

    // Iniciar ciclo
    animateTexto();

    // Limpiar en unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="text-center py-16 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-foreground mb-4 leading-tight">
        Entre <span className="text-primary">tú</span> y{" "}
        <span className="text-primary">yo</span>, aprendemos mejor.
      </h1>

      <span>icon</span>

      <h2 className="text-xl sm:text-2xl font-medium text-muted-foreground mb-8">
        <strong className="text-3xl text-foreground">Aquí puedes</strong>{" "}
        <span
          ref={textoRef}
          className="text-3xl  font-semibold transition-opacity duration-500 text-blue-200"
        >
          {palabras[index]}
        </span>
      </h2>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button size="lg" className="px-8 py-6 text-lg font-bold">
          Explorar dudas
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="px-8 py-6 text-lg font-bold border-primary text-primary"
        >
          Publicar mi duda
        </Button>
      </div>
    </div>
  );
}
