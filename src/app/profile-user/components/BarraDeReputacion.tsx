import { obtenerProgresoReputacion } from "../utils/reputacion";

interface BarraReputacionProps {
  puntos: number;
}

export function BarraReputacion({ puntos }: BarraReputacionProps) {
  const { actual, siguiente, progreso } = obtenerProgresoReputacion(puntos);

  return (
    <div className="p-4 bg-white dark:bg-slate-800 ">
      <div className="flex justify-between mb-1 text-xs md:text-sm font-medium">
        <span className="text-gray-700 dark:text-gray-200">
          {actual.nombre}
        </span>
        {siguiente ? (
          <span className="text-gray-500 dark:text-gray-400">
            Próximo nivel: {siguiente.nombre} ({siguiente.puntosMinimos} pts)
          </span>
        ) : (
          <span className="text-green-500 font-semibold">Nivel máximo</span>
        )}
      </div>
      <div className="w-full bg-gray-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-in-out"
          style={{
            width: `${progreso}%`,
            background: "linear-gradient(to right, #8b5cf6, #6366f1)",
          }}
        />
      </div>
      <p className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400">
        {puntos} pts / {siguiente?.puntosMinimos ?? puntos} pts
      </p>
    </div>
  );
}
