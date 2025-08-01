import * as z from "zod";

export const QuestionSchema = z.object({
  count: z.number(),
});

export type Question = z.infer<typeof QuestionSchema>;

export const UserProfilePreferencesSchema = z.object({
  profile_public: z.boolean(),
  allow_email: z.boolean(),
  allow_whatsapp: z.boolean(),
});

const userReputationSchema = z.object({
  id: z.string().optional(),
  score: z.number(),
});

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
  user_profile_preferences: UserProfilePreferencesSchema,
  questions: z.array(QuestionSchema),
  question_comments: z.array(QuestionSchema),
  user_reputation: userReputationSchema,
});

export type SchemaProfileResponse = z.infer<typeof SchemaProfileResponseSchema>;
