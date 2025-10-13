import Link from "next/link";
import { Newspaper } from "lucide-react";

export function EmptyNews() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6 ">
      <Newspaper className="w-12 h-12 text-muted-foreground mb-3" />
      <h2 className="text-xl font-semibold mb-2">
        No hay noticias en esta categoría
      </h2>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        Parece que por ahora no hay publicaciones aquí. Pero siempre puedes
        explorar lo más reciente en la sección principal.
      </p>
      <Link
        href="/news"
        className="px-4 py-2 text-sm font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition"
      >
        Ver las noticias más recientes
      </Link>
    </div>
  );
}
