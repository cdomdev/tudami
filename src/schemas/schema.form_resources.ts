import z from "zod";

export const FormSchemaResources = z.object({
  title: z.string(),
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

  category: z.string(),
  url: z.string().optional(),
  detail_title: z.string(),
  detail_desciption: z.string(),
  type: z.string(),
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
  public: z.boolean(),
  type: z.null(),
  slug: z.string(),
  category: z.string(),
  created_at: z.coerce.date(),
  details_resources: z.array(DetailsResourceSchema),
});
export type SchemaResoucesResponse = z.infer<
  typeof SchemaResoucesResponseElementSchema
>;
