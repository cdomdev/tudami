import { Star } from "lucide-react";

export function SkeletonOpinios() {
  const mockCards = Array.from({ length: 4 });
  return (
    <div className="grid grid-cols-4 gap-x-10">
      {mockCards.map((_, index) => (
        <div
          key={index}
          className="bg-card  border border-border rounded-xl p-5 shadow-sm animate-pulse space-y-2 mb-4"
        >
          <div className="flex gap-2 items-center">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="h-3 w-3/4 rounded-full bg-muted" />
          </div>

          <div className="flex gap-x-2 w-full">
            <div className="space-y-2 w-full">
              <div className=" w-full h-3 bg-muted/60 rounded" />
              <div className=" w-full h-3 bg-muted/60 rounded" />
              <div className=" w-full h-3 bg-muted/60 rounded" />
            </div>
          </div>

          {/* Etiquetas */}
          <div className="flex gap-2 mt-2">
            <Star className="text-gray-100 w-7 h-7" />
            <Star className="text-gray-100 w-7 h-7" />
            <Star className="text-gray-100 w-7 h-7" />
            <Star className="text-gray-100 w-7 h-7" />
          </div>
        </div>
      ))}
    </div>
  );
}
