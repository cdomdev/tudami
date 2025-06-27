import { z } from "zod";

export const preguntaSchema = z.object({
  title: z.string().min(10, "El título debe tener al menos 10 caracteres"),
  content: z.string().min(20, "El contenido no puede estar vacío"),
});
