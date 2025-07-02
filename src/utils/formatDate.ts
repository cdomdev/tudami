import { formatDistanceToNow, parseISO } from "date-fns";
import { es } from "date-fns/locale/es";

export function formatTimestamp(date: string) {
  return formatDistanceToNow(parseISO(date), { addSuffix: true, locale: es });
}