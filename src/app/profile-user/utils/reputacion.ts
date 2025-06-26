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
