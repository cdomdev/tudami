import { Header } from "./components/HeaderQuestions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorar preguntas | Tudami",
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
          <main className="mt-10 w-full lg:col-span-3 px-2 lg:pr-6 overflow-y-auto max-h-[calc(100vh-2rem)] continer-scrollbar-explore-questions">
            {children}
          </main>
          <aside className="hidden lg:flex lg:col-span-1 bg-accent w-72 mt-20 sticky top-32 self-start rounded-md py-5 overflow-y-auto  max-h-[calc(100vh-8rem)]">
            mejores temas
          </aside>
        </div>
      </div>
    </>
  );
}
