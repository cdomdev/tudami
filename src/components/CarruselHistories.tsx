import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { UserCircle2 } from "lucide-react";

const historias = [
  {
    nombre: "María G.",
    fecha: "10 junio 2025",
    historia:
      "Tuve dificultades con una evidencia del SENA y un compañero me explicó paso a paso cómo completarla.",
  },
  {
    nombre: "Luis R.",
    fecha: "2 mayo 2025",
    historia:
      "No entendía cómo subir un proyecto y alguien me orientó por WhatsApp. Fue clave para poder entregar a tiempo.",
  },
  {
    nombre: "Ana P.",
    fecha: "25 abril 2025",
    historia:
      "Gracias a un tutor voluntario aprendí a usar GitHub para mi evidencia final. Ahora puedo seguir usando la herramienta.",
  },
  {
    nombre: "Carlos M.",
    fecha: "8 abril 2025",
    historia:
      "Me ayudaron a entender un instructivo confuso. La comunidad fue muy rápida en responder.",
  },
  {
    nombre: "Julián T.",
    fecha: "30 marzo 2025",
    historia:
      "Pude hablar con otro aprendiz que ya había pasado por mi formación. Me dio recomendaciones útiles.",
  },
];

export function CarouselHistories() {
  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent className="gap-4 px-4 py-6">
          {historias.map((h, index) => (
            <CarouselItem
              key={index}
              className="basis-11/12 sm:basis-1/2 lg:basis-1/3"
            >
              <div className="rounded-xl border border-accent bg-accent p-5 h-full shadow-md transition hover:shadow-lg">
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
                <p className="text-sm  italic">
                  "{h.historia}"
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
