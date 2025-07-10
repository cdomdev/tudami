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
      <div className="min-h-dvh flex flex-col mt-16">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-4 max-w-6xl  gap-2 w-full mx-auto ">
          <main className="w-full mt-2 lg:col-span-3  mx-auto rounded-md ">
            {children}
          </main>

          <aside className="hidden lg:flex lg:col-span-1 bg-accent dark:bg-[var(--custom-bg)] sticky top-20 mt-2  self-start max-h-[calc(100vh-6rem)] px-4 py-4 rounded-md shadow-sm">
            <div className="my-1">
              <h2 className="pt-2 text-base lg:text-lg font-semibold text-slate-700 dark:text-slate-200 ">
                Temas populares
              </h2>
              <div className="border-t border-dashed bg-gray-700 mt-2 dark:bg-gray-400 mb-4 dark:border-dashed dark:border-gray-700" />
              <MapsTags />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
