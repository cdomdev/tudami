import Image from "next/image";
import Link from "next/link";

export function CardNews() {
  return (
    <Link
      href="https://www.reuters.com/technology/opera-launches-neon-ai-browser-join-agentic-web-browsing-race-2025-09-30/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <article className="grid grid-cols-6 gap-4 items-center border-b pb-6 hover:bg-muted/50 rounded-xl transition p-5">
        <div className="col-span-4 space-y-2">
          <h2 className="font-bold text-xl md:text-2xl leading-snug  transition">
            🔥 Opera lanza Neon, un navegador potenciado por IA
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base line-clamp-3">
            Opera presenta Neon, un navegador con agentes inteligentes capaz de
            ejecutar tareas dentro de páginas web, sumándose a la carrera de la
            navegación web potenciada por IA.
          </p>
          <time className="block text-xs text-gray-500 dark:text-gray-400">
            30/09/2025 · Reuters
          </time>
        </div>

        <div className="col-span-2">
          <Image
            src="/image.png"
            alt="Opera Neon navegador con IA"
            width={400}
            height={250}
            className="w-full h-40 object-cover rounded-lg shadow-sm"
          />
        </div>
      </article>
    </Link>
  );
}
