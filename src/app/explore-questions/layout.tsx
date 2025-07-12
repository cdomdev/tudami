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
            <main className="w-full mt-2 lg:col-span-5 mx-auto rounded-md px-5">
              {children}
            </main>

            <aside
              className="hidden lg:flex flex-col space-y-3 mt-2 lg:col-span-2 sticky top-20 self-start max-h-[calc(100vh-2rem)]"
              aria-label="Explorar preguntas por etiquetas"
            >
              <h2 className="pt-5 mb-1 text-base lg:text-lg font-normal text-slate-700 dark:text-slate-200 ">
                Explora preguntas
              </h2>
              <div className="border-t p-0 border-dashed  dark:bg-gray-400 dark:border-dashed " />
              <ExploresQuestionsByTagsLayout />
            </aside>
          </div>
        </div>
      </>
    </>
  );
}
