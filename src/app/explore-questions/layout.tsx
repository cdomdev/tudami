import { Header } from "./components/HeaderQuestions";
import { Metadata } from "next";

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
        <div className="grid grid-cols-1 lg:grid-cols-4 max-w-6xl mx-auto gap-5">
          <main className="mt-5 w-full lg:col-span-3 px-2 lg:pr-6 overflow-y-auto max-h-[calc(100vh-2rem)] continer-scrollbar-explore-questions">
            {children}
          </main>

          <aside className="hidden lg:flex lg:col-span-1 bg-accent w-72 mt-6 sticky top-20  self-start max-h-[calc(100vh-2rem)] px-4 rounded-sm">
            <div className="mx-3 pb-3">
              <p className="pt-4">aqui hay contenido</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
