import { Header } from "./components/HeaderQuestions";
import { Metadata } from "next";
import { ExploresQuestionsByTagsLayout } from "./components/TapsQuestions";
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
      <>
        <header>
          <Header />
        </header>

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
    </>
  );
}
