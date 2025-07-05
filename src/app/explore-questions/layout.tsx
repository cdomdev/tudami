import { Header } from "./components/HeaderQuestions";
import { Metadata } from "next";
import { MapsTags } from "./components/MapsTags";

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
      <div className="min-h-dvh flex flex-col mt-20">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-4 max-w-6xl  gap-3 w-full mx-auto ">
          <main className="w-full lg:col-span-3 px-2 lg:pr-6  mx-auto ">
            {children}
          </main>

          <aside className="hidden lg:flex lg:col-span-1 bg-accent sticky top-20  self-start max-h-[calc(100vh-2rem)] px-4 rounded-md">
            <div className="mx-3 pb-3">
              <h2 className="pt-4 text-base lg:text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Temas populares
              </h2>
              <MapsTags />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
