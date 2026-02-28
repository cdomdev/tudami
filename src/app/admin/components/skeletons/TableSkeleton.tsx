import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-end py-4">
        <Skeleton className="h-8 w-[120px]" />
      </div>
      <div className="rounded-md border">
        <div className="grid grid-cols-5 border-b p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-[120px]" />
          ))}
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="grid grid-cols-5 p-4 border-b last:border-0">
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-[150px]" />
            ))}
          </div>
        ))}
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-8 w-[100px]" />
      </div> */}
    </div>
  );
}
