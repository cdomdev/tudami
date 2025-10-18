import Image from "next/image";
import { StarRating } from "./StartRating";
import { DialogOpinions } from "./DialogOpinions";

const date = new Date().toLocaleDateString("es-ES", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function NoOpinios() {
  const historie = [
    {
      nombre: "Tudami",
      fecha: date,
      history:
        '"En tudami nos interesa tu opinión, por eso hemos creado este espacio para que puedas compartir tu experiencia con nosotros. Tu feedback es fundamental para ayudarnos a mejorar y ofrecerte un mejor servicio. ¡Gracias por ser parte de nuestra comunidad!"',
    },
  ];

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
        <DialogOpinions textBtn="Opinar sobre Tudami" variant={"default"} />
      </div>
    </article>
  );
}
