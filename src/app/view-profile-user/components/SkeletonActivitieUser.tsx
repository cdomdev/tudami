export function SkeletonActividadUsuario() {
  return (
    <div>
      <div className="pl-7">
        <div className="h-5 w-40 bg-slate-200 dark:bg-slate-700 rounded mb-4 animate-pulse" />
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-2 rounded-sm bg-slate-50 dark:bg-slate-800 shadow-sm"
            >
              <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
              <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
