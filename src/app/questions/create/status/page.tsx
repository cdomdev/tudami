import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Eye, Plus } from "lucide-react";
import { Confetti } from "@/components/Confetti";

export const metadata: Metadata = {
  title: "Pregunta enviada con éxito",
  description:
    "Tu pregunta ha sido publicada y está disponible para la comunidad.",
};
export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4 text-center relative overflow-hidden">
     
      <div className="w-full flex justify-center ">
        <Confetti />
      </div>

      <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-sky-500 bg-clip-text text-transparent z-20">
        ¡Pregunta enviada con éxito!
      </h1>

      <p className="text-muted-foreground text-lg max-w-md mb-8 z-20">
        Tu pregunta ha sido publicada y ahora está disponible para que la
        comunidad pueda ayudarte.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md z-20">
        <Link href="/explore-questions/questions?query=my" className="w-full">
          <Button
            variant="default"
            size="lg"
            className="w-full group flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Eye className="w-5 h-5 group-hover:animate-pulse" />
            <span>Ver mi pregunta</span>
          </Button>
        </Link>

        <Link href="/create-questions" className="w-full">
          <Button
            variant="outline"
            size="lg"
            className="w-full group flex items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer dark:bg-accent "
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            <span>Nueva pregunta</span>
          </Button>
        </Link>
      </div>

      <Link
        href="/"
        className="mt-8 text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al inicio</span>
      </Link>
    </div>
  );
}
