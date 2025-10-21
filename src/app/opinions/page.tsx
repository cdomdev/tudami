import { ListOpinios } from "./components/ListOpinions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Explorar opiniones de la comunidad",
    template: "%s | Tudami",
  },
  description:
    "Conoce las experiencias y valoraciones de los usuarios que hacen parte de Tudami. Descubre cómo la comunidad colabora, aprende y crece compartiendo sus opiniones.",
};

export default function Page() {
  return (
    <section className="md:max-w-6xl mx-auto mt-20 md:mt-32 px-4">
      <h1 className="text-xl md:text-2xl text-center font-semibold">
        Opiniones de la comunidad
      </h1>
      <p className="text-center md:text-base mt-4 max-w-2xl mx-auto text-foreground dark:text-gray-300 ">
        En esta sección encontrarás un resumen de las experiencias compartidas
        por los usuarios de <strong>Tudami</strong>. Cada opinión refleja cómo
        la plataforma ha contribuido al aprendizaje, la colaboración y el apoyo
        entre aprendices. Agradecemos profundamente cada comentario, ya que nos
        impulsa a seguir mejorando y construyendo una comunidad más fuerte y
        solidaria.
      </p>
      <div className="mt-10">
        <ListOpinios />
      </div>
    </section>
  );
}
