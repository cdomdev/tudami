"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ButtonGsap } from "@/components/ui/ButtonsGsap";
import { useSession } from "@/context/context.sesion";
import { useRouter } from "next/navigation";

const palabras = [
  "hacer preguntas",
  "solicitar ayuda",
  "ofrecer ayuda",
  "encontrar recursos",
];

export function Hero() {
  const textoRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { user } = useSession();

  const handleClickBtnQuestions = () => {
    if (user) {
      router.push("/questions/create");
    } else {
      router.push("/auth/login");
    }
  };

  const handleClickBtnExplore = () => {
    if (user) {
      router.push("/questions/explore");
    } else {
      router.push("/auth/login");
    }
  };
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
    <div className="text-center pt-16 px-4 max-w-3xl mx-auto mt-10 mb-5 overflow-hidden ">
      <div className="flex flex-col items-center justify-center pb-6 gap-2 mb-4 md:flex-row md:gap-3">
        <h1 className="relative text-5xl md:text-7xl font-extrabold text-foreground leading-tight animate-slide-in-top">
          <span className="inline-block relative">
            <Sparkles className="absolute -left-6 top-1.5 w-5 h-5 text-primary animate-pulse md:w-7 md:h-7 md:-left-8 md:top-2" />
            Entre
          </span>{" "}
          <span className="bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
            tú
          </span>{" "}
          y{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-sky-400 text-transparent bg-clip-text">
            yo
          </span>
          <span className="hidden" /> aprendemos mejor.
        </h1>
      </div>
      <h2 className="relative flex flex-col md:flex-row justify-center items-center gap-2  text-muted-foreground mb-12 text-center animate-slide-in-bottom">
        <span className="hidden dark:inline-block absolute -inset-x-4 -top-14 size-60 mx-auto rounded-full bg-white/10 blur-2xl z-0" />

        <strong className="relative z-10 block text-foreground text-xl lg:text-4xl ">
          Aquí puedes
        </strong>
        <span
          ref={textoRef}
          className="relative text-xl lg:text-5xl z-10 block font-extrabold text-transparent  bg-clip-text bg-gradient-to-r  from-sky-400 via-blue-500 to-red-600"
        >
          {palabras[index]}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 pt-5">
        <ButtonGsap
          text="Hacer una pregunta"
          flairColor="bg-indigo-500"
          className="text-base sm:text-lg cursor-pointer w-full font-bold border border-white px-6 py-4 rounded-md bg-black text-white animate-slide-in-left"
          onclick={handleClickBtnQuestions}
        />

        <ButtonGsap
          text="Explorar preguntas"
          flairColor="bg-gradient-to-r from-pink-500 to-red-500"
          className="text-base w-full  cursor-pointer sm:text-lg font-bold border border-gray-300 px-6 py-4 rounded-md bg-white text-black hover:text-white animate-slide-in-right"
          onclick={handleClickBtnExplore}
        />
      </div>
    </div>
  );
}
