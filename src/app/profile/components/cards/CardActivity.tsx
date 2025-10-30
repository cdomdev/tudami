export function CardsCounts({
  counter,
  text,
}: {
  counter?: number;
  text: string;
}) {
  return (
    <div className="rounded-xl p-5 text-white shadow-sm hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-slate-600 via-gray-700 to-slate-800 z-0 overflow-hidden relative before:absolute before:w-full before:aspect-square before:left-0 before:top-0 before:rounded-full before:blur-3xl before:opacity-30 before:-z-10 before:transition before:bg-gradient-to-r before:from-cyan-500 before:to-indigo-600 hover:shadow-lg hover:shadow-purple-500/25">
      <p className="text-xl md:text-4xl font-bold text-center">{counter}</p>
      <p className="mt-2 text-sm opacity-90  text-center">{text}</p>
    </div>
  );
}
