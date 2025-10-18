import z from "zod";

export const FormRaiting = z.object({
  opinion: z.string().min(10, "Mínimo 10 caracteres, maximo 300 caracteres").max(300),
});

export type SchemaRaiting = z.infer<typeof FormRaiting>;
