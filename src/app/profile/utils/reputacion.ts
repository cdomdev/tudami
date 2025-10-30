import { nivelesReputacion } from "./nivelReputacion";

export function obtenerNivelReputacion(puntos: number) {
  return (
    nivelesReputacion
      .slice()
      .reverse()
      .find((nivel) => puntos >= nivel.puntosMinimos) ?? nivelesReputacion[0]
  );
}

export function obtenerProgresoReputacion(puntos: number) {
  const ordenados = [...nivelesReputacion].sort(
    (a, b) => a.puntosMinimos - b.puntosMinimos
  );

  const actual =
    ordenados.findLast((n) => puntos >= n.puntosMinimos) ?? ordenados[0];
  const siguiente = ordenados.find((n) => n.puntosMinimos > puntos);

  let progreso = siguiente
    ? ((puntos - actual.puntosMinimos) /
        (siguiente.puntosMinimos - actual.puntosMinimos)) *
      100
    : 100;

  // Si hay siguiente nivel y el progreso es 0, mostrar al menos 1%
  if (siguiente && progreso === 0) {
    progreso = 1;
  }

  return {
    actual,
    siguiente,
    progreso: Math.min(Math.max(progreso, 0), 100),
  };
}



 export function getColorByLevel(nivel: string) {
    switch (nivel.toLowerCase()) {
      case "principiante":
        return "#10b981, #06b6d4, #0ea5e9";
      // Verde esmeralda a cyan (gradiente fresco)
      case "aprendiz":
        return "#3b82f6, #6366f1, #8b5cf6";
      // Azul a púrpura (gradiente Tudami)
      case "intermedio":
        return "#8b5cf6, #a855f7, #c026d3";
      // Púrpura vibrante (gradiente intermedio)
      case "avanzado":
        return "#ec4899, #f43f5e, #ef4444";
      // Rosa a rojo (gradiente cálido)
      case "experto":
        return "#f59e0b, #f97316, #dc2626";
      // Naranja a rojo (gradiente experto)
      case "maestro":
        return "#eab308, #f59e0b, #ec4899";
      // Dorado a rosa (gradiente maestro premium)
      default:
        return "#64748b, #475569, #334155";
      // Gris neutro progresivo
    }
  }