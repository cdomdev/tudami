import z from "zod";

export const FormSchemaResources = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres").max(100),
  description: z.string().min(10, "Mínimo 10 caracteres").max(1000),
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
  category: z.string().min(3, "Debe seleccionar una categoria").max(50),
  type: z.string().min(3, "Debe seleccionar el tipo de recurso").max(50),
  url: z.string().min(5, "Mínimo 5 caracteres").max(100, "Máximo 100 caracteres").url("Debe ser una URL válida"),
  detail_title: z.string().min(3, "Mínimo 3 caracteres").max(100),
  detail_description: z.string().min(10, "Mínimo 10 caracteres").max(1000),
  status: z.string().optional(),
});

export type SchemaResources = z.infer<typeof FormSchemaResources>;

export const DetailsResourceSchema = z.object({
  id: z.number(),
  title: z.string(),
  created_at: z.coerce.date(),
  description: z.string(),
  resource_id: z.number(),
  url_resource: z.string(),
});

export type DetailsResource = z.infer<typeof DetailsResourceSchema>;

export const SchemaResoucesResponseElementSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  url_image: z.string(),
    status: z.string().optional(),
  type: z.null(),
  slug: z.string(),
  category: z.string(),
  created_at: z.coerce.date(),
  details_resources: z.array(DetailsResourceSchema),
});
export type SchemaResoucesResponse = z.infer<
  typeof SchemaResoucesResponseElementSchema
>;
