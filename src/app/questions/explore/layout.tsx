import { Metadata } from "next";
import { SearchInput } from "./components/Search";
import Link from "next/link";
import { Plus, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExploresQuestionsByTagsLayout } from "./components/TapsQuestions";

export const metadata: Metadata = {
  title: {
    default: "Explorar preguntas y ofertas",
    template: "%s | Tudami",
  },
  description:
    "Descubre preguntas de otros aprendices, encuentra respuestas útiles y comparte tu conocimiento con la comunidad en Tudami.",
};

export default function ExploreQuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="z-10 w-full pt-24 pb-8 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-6xl px-4 mx-auto mb-4">
          <div className="mb-8 text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Explorar Preguntas y Ofertas
            </h1>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Descubre preguntas de otros usuarios, comparte tus conocimientos y
              encuentra oportunidades para ayudar o recibir ayuda. ¡Participa,
              aprende y colabora en una comunidad que crece contigo!
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
            <SearchInput />
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto justify-center">
              <Button asChild className="w-full sm:w-auto group">
                <Link href="/questions/create" className="flex items-center">
                  <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
                  Nueva pregunta
                </Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="w-full sm:w-auto group"
              >
                <Link href="/offers/explore" className="flex items-center">
                  <Telescope className="mr-2 h-4 w-4 group-hover:animate-bounce transition-transform" />
                  Explorar ofertas
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
              Explora preguntas
            </h2>
            <div className="hidden lg:block border-t p-0 border-dashed dark:bg-gray-400 dark:border-dashed" />
            <ExploresQuestionsByTagsLayout />
          </aside>
        </div>
      </div>
    </>
  );
}
