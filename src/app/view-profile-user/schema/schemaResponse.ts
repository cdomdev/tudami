import * as z from "zod";

export const QuestionSchema = z.object({
  count: z.number(),
});

export type Question = z.infer<typeof QuestionSchema>;

export const SchemaProfileResponseSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  avatar_url: z.string().nullable(),
  email: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().nullable(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  department: z.string().nullable(),
  created_at: z.coerce.date(),
  user_profile_preferences: z.record(z.any()),
  questions: z.array(QuestionSchema),
  question_comments: z.array(QuestionSchema),
});

export type SchemaProfileResponse = z.infer<typeof SchemaProfileResponseSchema>;
