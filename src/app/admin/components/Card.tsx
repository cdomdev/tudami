export function Card({
  title,
  text,
  data,
  color = "indigo",
  icon,
}: {
  title: string;
  text: string;
  data: string | number;
  color?: string;
  icon?: React.ReactNode;
}) {
  const colorMap: Record<string, string> = {
    indigo: "from-indigo-600 to-indigo-400",
    green: "from-emerald-600 to-emerald-300",
    yellow: "from-yellow-600 to-yellow-300",
    red: "from-rose-600 to-rose-300",
    slate: "from-slate-400 to-slate-300",
  };

  const accent = color.startsWith("from-")
    ? color
    : (colorMap[color] ?? colorMap.indigo);

  return (
    <article className="flex items-center justify-between gap-4 w-full p-4 bg-white/80 dark:bg-slate-800/60 rounded-xl shadow-md border border-gray-100 dark:border-slate-700 dark:shadow-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-lg text-white shadow-sm bg-linear-to-br ${accent}`}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-100 truncate">
            {title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-300 truncate">
            {text}
          </p>
        </div>
      </div>

      <div className="text-right border border-dashed px-3 py-1 rounded-md ">
        <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
          {data}
        </span>
      </div>
    </article>
  );
}
