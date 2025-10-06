export function SkeletonCardNews() {
  const mockCards = Array.from({ length: 5 });
  return (
    <>
      {mockCards.map((_, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl p-5 shadow-sm animate-pulse space-y-4 mb-4"
        >
          <div className="h-4 w-3/5 bg-muted/50 rounded" />

          <div className="flex gap-x-2 w-full">
            <div className="space-y-2 w-3/4">
              <div className=" w-full h-3 bg-muted/30 rounded" />
              <div className=" w-full h-3 bg-muted/30 rounded" />
              <div className=" w-full h-3 bg-muted/30 rounded" />
              <div className=" w-full h-3 bg-muted/30 rounded" />
              <div className=" w-full h-3 bg-muted/30 rounded" />
            </div>
            <div className="w-1/3 h-20 bg-muted/30 rounded" />
          </div>

          {/* Etiquetas */}
          <div className="flex gap-20 flex-wrap mt-2">
            <div className="flex gap-1">
              <div className="h-5 w-4 bg-muted/40 rounded-full" />
              <div className="h-5 w-4 bg-muted/40 rounded-full" />
            </div>
            <div className="h-5 w-20 bg-muted/40 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
}
