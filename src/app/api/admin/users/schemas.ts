import * as z from "zod";

export const UpdateUserSchema = z
  .object({
    full_name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    role: z.string().optional(),
    phone: z.union([z.string(), z.number()]).optional(),
    bio: z.string().optional(),
    avatar_url: z.string().url().optional(),
  })
  .partial();

export type UpdateUserSchemaType = z.infer<typeof UpdateUserSchema>;