import z from "zod"

export const FormSchemaResources = z.object({
    title: z.string(),
    description: z.string(),
    image: z.any()
        .refine((file) => file instanceof File || file === undefined, {
            message: "Debe ser un archivo válido",
        })
        .optional(),
    category: z.string(),
    url: z.string().optional(),
    detail_title: z.string(),
    detail_desciption: z.string(),
})


export type SchemaResources = z.infer<typeof FormSchemaResources>;