import z from "zod";

export const FormSchemaNews = z.object({
  id: z.number(),
  title: z.string(),
  sub_title: z.string(),
  slug: z.string().optional(),
  description: z.string(),
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
  source: z.string(),
  url_source: z.string(),
  created_at: z.string().optional(),
});

export type SchemaNews = z.infer<typeof FormSchemaNews>;

