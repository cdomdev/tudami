import { catalogoInsignias } from "./catalogoInsignias";

export function obtenerInsigniasUsuario(insigniasObtenidas: { badge: string }[]) {
  const idsObtenidos = insigniasObtenidas.map((i) => i.badge);

  return catalogoInsignias
    .filter((insignia) => idsObtenidos.includes(insignia.id))
    .map((insignia) => ({
      ...insignia,
      obtenida: true,
    }));
}
