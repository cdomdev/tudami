import { formatDistanceToNowStrict, parseISO, format } from "date-fns";
import { es } from "date-fns/locale/es";

export function formatTimestamp(date: string) {
  const distance = formatDistanceToNowStrict(parseISO(date), { locale: es, roundingMethod: 'floor' });

  if (distance.includes("0 segundos")) return "justo ahora";
  if (distance.includes("0 minutos")) return "justo ahora";

  return distance;
}


export function formatJoinDate(date: string) {
  return format(parseISO(date), "MMMM yyyy", { locale: es });
}
