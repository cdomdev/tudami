import z from "zod";

export const FormSchemaNews = z.object({
  id: z.number().optional(),
  title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  sub_title: z.string().min(5, "El subtítulo debe tener al menos 5 caracteres"),
  slug: z.string().optional(),
  description: z.string().min(20, "La descripción debe tener al menos 20 caracteres"),
  image: z
  .any()
  .refine(
    (file) =>
      file instanceof File ||
      typeof file === "string" ||
      file === undefined ||
      file === "",
    {
      message: "Debe ser un archivo válido o una URL",
    }
  )
  .optional(),
  source: z.string().min(3, "La fuente debe tener al menos 3 caracteres"),
  url_source: z.string().optional(),
  created_at: z.string().optional(),
});

export type SchemaNews = z.infer<typeof FormSchemaNews>;

