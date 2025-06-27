import { Header } from "./sections/HeaderQuestions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorar preguntas | TuDami",
  description:
    "Explora preguntas de la comunidad, encuentra respuestas y comparte conocimiento.",
};

export default function ExploreQuestionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-4 max-w-6xl mx-auto gap-5">
        {/* Contenido principal */}
        <main className="w-full lg:col-span-3 overflow-y-auto max-h-[calc(100vh-1rem)] px-2 lg:pr-6">{children}</main>

        <aside className="hidden bg-accent  w-72  mt-20 lg:flex sticky top-80 self-start rounded-md py-20 shadow  lg:col-span-1">
          mejores temas
        </aside>
      </div>
    </div>
  );
}
