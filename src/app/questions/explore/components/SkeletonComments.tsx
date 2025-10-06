export function SkeletonComments() {
  const mockCards = Array.from({ length: 2 });
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

          {/* Contenido simulado */}
          <div className="space-y-2">
            <div className="w-full h-1 bg-muted/30 rounded" />
            <div className="w-full h-1 bg-muted/30 rounded" />
            <div className="w-full h-1 bg-muted/30 rounded" />
          </div>

         

          {/* Acciones (likes/comentarios) */}
          <div className="flex justify-between items-center border-border mt-4">
            <div className="flex gap-4">
              <div className="h-4 w-10 bg-muted/30 rounded" />
              <div className="h-4 w-10 bg-muted/30 rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
