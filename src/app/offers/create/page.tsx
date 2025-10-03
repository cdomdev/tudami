import { Metadata } from "next";
import { Recommendations } from "./components/Recommendations";
import { EditorOffers } from "./components/EditorOffers";

export const metadata: Metadata = {
  title: { default: "Crear una nueva oferta", template: "%s | Tudami" },
  description:
    "Publica una nueva oferta en Tudami y conecta con aprendices interesados en compartir y potenciar sus habilidades.",
};

export default function offerPage() {
  return (
    <>
      <h1 className="max-w-6xl mx-auto mb-2 mt-24 md:mt-30 text-left pl-10 font-medium text-2xl md:text-3xl text-primary">
        Crea tu próxima oferta
      </h1>
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 px-2">
        <article className="md:col-span-4 px w-full shadow-sm order-2 lg:order-1 dark:bg-custom-card rounded-sm max-h-[580px]">
          <EditorOffers />
        </article>
        <article className="md:col-span-2 p-6 shadow-sm dark:bg-custom-card rounded-sm order-1 lg:order-2">
          <Recommendations />
        </article>
      </section>
    </>
  );
}
