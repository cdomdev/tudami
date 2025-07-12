export function SkeletonCard() {
  const mockCards = Array.from({ length: 5 });
  return (
    <>
      {mockCards.map((_, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl p-5 shadow-sm animate-pulse space-y-4"
        >
          {/* Header (avatar + nombre) */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted/40" />
            <div className="flex-1 space-y-1">
              <div className="w-1/3 h-4 bg-muted/40 rounded" />
              <div className="w-1/4 h-3 bg-muted/30 rounded" />
            </div>
          </div>

          {/* Título */}
          <div className="h-4 w-3/4 bg-muted/50 rounded" />

          {/* Contenido simulado */}
          <div className="space-y-2">
            <div className="w-full h-3 bg-muted/30 rounded" />
            <div className="w-5/6 h-3 bg-muted/30 rounded" />
            <div className="w-3/4 h-3 bg-muted/30 rounded" />
          </div>

          {/* Etiquetas */}
          <div className="flex gap-2 flex-wrap mt-2">
            <div className="h-5 w-16 bg-muted/40 rounded-full" />
            <div className="h-5 w-12 bg-muted/40 rounded-full" />
          </div>

          {/* Acciones (likes/comentarios) */}
          <div className="flex justify-between items-center pt-3 border-t border-border mt-4">
            <div className="flex gap-4">
              <div className="h-4 w-10 bg-muted/30 rounded" />
              <div className="h-4 w-10 bg-muted/30 rounded" />
            </div>
            <div className="h-4 w-6 bg-muted/30 rounded" />
          </div>
        </div>
      ))}
    </>
  );
}
