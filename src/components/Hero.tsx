"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ButtonGsap } from "./ui/ButtonsGsap";

const palabras = [
  "hacer preguntas",
  "solicitar ayuda",
  "ofrecer ayuda",
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

    <div className="text-center py-16 px-4 max-w-screen-full mx-auto my-10 ">
      <div className="flex flex-col items-center justify-center pb-6 gap-2 mb-4 md:flex-row md:gap-3">
        <Sparkles className="w-6 h-6 text-primary animate-pulse md:w-14 md:h-14" />
        <h1 className="text-5xl md:text-7xl font-extrabold text-foreground leading-tight">
          Entre{" "}
          <span className="bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
            tú
          </span>{" "}
          y{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-sky-400 text-transparent bg-clip-text">
            yo
          </span>
          , aprendemos mejor.
        </h1>

      </div>

      <h2 className="text-base  md:text-3xl justify-center items-center gap-2 flex font-medium text-muted-foreground mb-12">
        <strong className="block text-2xl sm:text-4xl text-foreground">Aquí puedes</strong>{" "}
        <span
          ref={textoRef}
          className="block text-2xl sm:text-3xl font-bold transition-opacity duration-400 text-blue-800 dark:text-blue-500"
        >
          {palabras[index]}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
        <ButtonGsap
          text="Explorar dudas"
          href="/questions"
          flairColor="bg-indigo-500"
          className="text-base sm:text-lg w-full font-bold border border-white px-6 py-4 rounded-md bg-black text-white"
        />

        <ButtonGsap
          text="Publicar mi duda"
          href="/questions"
          flairColor="bg-gradient-to-r from-pink-500 to-red-500"
          className="text-base w-full  sm:text-lg font-bold border border-gray-300 px-6 py-4 rounded-md bg-white text-black hover:text-white"
        />


      </div>
    </div>


  );
}
