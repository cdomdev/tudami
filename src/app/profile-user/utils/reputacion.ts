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

  const progreso = siguiente
    ? ((puntos - actual.puntosMinimos) /
        (siguiente.puntosMinimos - actual.puntosMinimos)) *
      100
    : 100;

  return {
    actual,
    siguiente,
    progreso: Math.min(Math.max(progreso, 0), 100),
  };
}



 export function getColorByLevel(nivel: string) {
    switch (nivel.toLowerCase()) {
      case "principiante":
        return "#4ade80, #22c55e";
      // Verde suave a verde brillante
      case "aprendiz":
        return "#60a5fa, #3b82f6";
      // Azul claro a azul
      case "intermedio":
        return "#a78bfa, #8b5cf6";
      // Púrpura claro a púrpura
      case "avanzado":
        return "#f472b6, #ec4899";
      // Rosa claro a rosa intenso
      case "experto":
        return "#fb923c, #f97316";
      // Naranja claro a naranja
      case "maestro":
        return "#facc15, #eab308";
      // Amarillo claro a amarillo dorado
      default:
        return "#94a3b8, #64748b";
      // Gris claro a gris (nivel por defecto)
    }
  }