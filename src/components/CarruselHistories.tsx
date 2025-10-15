import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { UserCircle2 } from "lucide-react";
import { useState } from "react";
import { DialogOpinion } from "./DialogComment";
import Image from "next/image";
import { StarRating } from "./StartRating";

interface Historie {
  nombre: string;
  fecha: string;
  history: string;
}

const date = new Date().toLocaleDateString("es-ES", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const historie = [
  {
    nombre: "Tudami",
    fecha: date,
    history:
      '"En tudami nos interesa tu opinión, por eso hemos creado este espacio para que puedas compartir tu experiencia con nosotros. Tu feedback es fundamental para ayudarnos a mejorar y ofrecerte un mejor servicio. ¡Gracias por ser parte de nuestra comunidad!"',
  },
];

export function CarouselHistories() {
  const [data] = useState<Historie[]>([]);

  if (data.length === 0) {
    return (
      <article className="flex justify-center">
        <div className="rounded-xl flex flex-col space-y-5 border border-accent bg-accent dark:bg-custom-card p-5 h-full shadow-md transition hover:shadow-lg cursor-grab max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gray-500 rounded-full">
              <Image
                src="/avatar_default.png"
                alt="Tudami logo"
                width={35}
                height={40}
                className="rounded-full object-"
              />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Tudin</p>
              <p className="text-xs ">{date}</p>
            </div>
          </div>
          <div className="w-full h-px bg-accent-foreground my-4" />
          <p className="text-sm mb-3 italic">{historie[0].history}</p>
          <StarRating value={5} readOnly={true} />
          <DialogOpinion />
        </div>
      </article>
    );
  }

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent className="gap-4 px-4 py-6">
          {data.map((h, index) => (
            <CarouselItem
              key={index}
              className="basis-11/12 sm:basis-1/2 lg:basis-1/3"
            >
              <div className="rounded-xl border border-accent bg-accent dark:bg-custom-card p-5 h-full shadow-md transition hover:shadow-lg cursor-grab">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <UserCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold">{h.nombre}</p>
                    <p className="text-xs ">{h.fecha}</p>
                  </div>
                </div>
                <div className="w-full h-px bg-accent-foreground my-4" />
                <p className="text-sm  italic">{h.history}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
