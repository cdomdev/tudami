"use client";

import { CardHowItWorks } from "@/components/Card";
import { ButtonGsap } from "../ui/ButtonsGsap";
import Image from "next/image";
import { useSession } from "@/context/context.sesion";
import { useRouter } from "next/navigation";
export function HowIsWorks() {
  const { user, openModal } = useSession();
  const router = useRouter();
  const items = [
    {
      paso: 1,
      link: "/explore-questions",
      title: "Navega por preguntas reales de otros aprendices",
      descrition: "Tal vez ya alguien preguntó lo mismo que tú.",
      comment: [
        "“¿Cómo lleno el formato F01?”",
        "“¿Qué significa un ambiente virtual en Sofiaplus?”",
      ],

      urlIcon: "/share.svg",
    },
    {
      paso: 2,
      link: "/create-questions",
      title: "¿No encontraste lo que buscabas? Comparte tu duda.",
      descrition: "Solo escribe lo que necesitas y listo.",
      comment: [
        " Puedes agregar etiquetas para que otros la encuentren más fácil.",

        "No necesitas saber cómo redactarla perfecto, solo cuéntala con tus palabras.",
      ],
      urlIcon: "/windows.svg",
    },
    {
      paso: 3,
      link: "/explore-questions",
      title: "Otros personas responderán con ideas o consejos.",
      descrition: "Tú decides cuál respuesta te sirvió más.",
      comment: [" Aquí todos aprendemos con la experiencia de otros."],
      urlIcon: "/Module.svg",
    },
  ];

  const handleClickBtnExplore = () => {
    if (user) {
      router.push("/explore-questions");
    } else {
      openModal();
    }
  };
  return (
    <>
      <h2 className="text-center font-bold text-2xl md:text-3xl">
        ¿Como funciona Tudami?
      </h2>
      <p className="text-base  text-center text-accent-foreground">
        Es muy facil, sigue los siguientes pasos
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10 max-w-6xl mx-auto ">
        {items.map((item, index) => (
          <li key={item.paso || index} >
            <CardHowItWorks
              key={item.paso || index}
              description={item.descrition}
              title={item.title}
              paso={item.paso}
              link={item.link}
              coment={item.comment}
              iconUrl={item.urlIcon}
            />
          </li>
        ))}
      </ul>
      <div className=" w-full">
        <h4 className="text-xl text-center font-semibold">
          Ya puedes comenzar
        </h4>
        <p className="text-base  text-center text-accent-foreground">
          Hoy das ayuda, mañana puedes perdirla{" "}
        </p>{" "}
        <Image
          src="/Business.svg"
          alt="image-business"
          width={40}
          height={40}
          className="mx-auto mb-7"
        />
        <div className="flex justify-center">
          <ButtonGsap
            text="Hacer preguntas"
            flairColor="bg-indigo-500"
            className="text-base sm:text-lg w-2/4 font-bold border border-white px-6 py-4  rounded-md  bg-black text-white cursor-pointer"
            onclick={handleClickBtnExplore}
          />
        </div>
      </div>
    </>
  );
}
