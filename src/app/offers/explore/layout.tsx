import { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExploresOffers } from "./components/TagsOffers";

export const metadata: Metadata = {
  title: "Explorar preguntas",
  description:
    "Explora preguntas de la comunidad, encuentra respuestas y comparte conocimiento.",
};

export default function ExploreQuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="z-10 w-full pt-24 pb-8 bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl px-4 mx-auto mb-4">
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Explora las ofertas publicadas por otros usuarios
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
              Encuentra oportunidades para colaborar, contratar o vender tus
              servicios. Hay ofertas pagadas y colaborativas, creadas por la
              comunidad para la comunidad. ¡Descubre, postula o crea la tuya hoy
              mismo!
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto justify-center">
              <Button asChild className="w-full sm:w-auto group">
                <Link href="/offers/create" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                  Publicar oferta
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-dvh flex flex-col mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-7 max-w-6xl w-full mx-auto">
          <main className="w-full mt-2 lg:col-span-5 mx-auto rounded-md px-5 md:order-2 lg:order-1">
            {children}
          </main>

          <aside
            className="
              px-2
             md:px-5
    fixed bottom-0 left-0 right-0            
    md:static md:order-1                     
    lg:sticky lg:top-20 lg:self-start         
    flex flex-col space-y-3 mt-2
    lg:col-span-2
    lg:px-0
    max-h-[calc(100vh-2rem)] overflow-x-hidden
  "
            aria-label="Explorar preguntas por etiquetas"
          >
            <h2 className="hidden lg:block pt-5 mb-1 text-base lg:text-lg font-normal text-slate-700 dark:text-slate-200">
              Explora ofertas de otros usuarios
            </h2>
            <div className="hidden lg:block border-t p-0 border-dashed dark:bg-gray-400 dark:border-dashed" />
            <ExploresOffers />
          </aside>
        </div>
      </div>
    </>
  );
}
