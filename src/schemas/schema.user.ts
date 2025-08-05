import * as z from "zod";

export const QuestionSchema = z.object({
  count: z.number(),
});
export type Question = z.infer<typeof QuestionSchema>;

export const UserAchievementSchema = z.object({
  id: z.number(),
  achievement_id: z.string(),
});
export type UserAchievement = z.infer<typeof UserAchievementSchema>;

export const UserProfilePreferencesSchema = z.object({
  allow_email: z.boolean(),
  allow_whatsapp: z.boolean(),
  profile_public: z.boolean(),
});
export type UserProfilePreferences = z.infer<
  typeof UserProfilePreferencesSchema
>;

export const UserReputationSchema = z.object({
  id: z.number(),
  score: z.number(),
});

export type UserReputation = z.infer<typeof UserReputationSchema>;

export const User = z.object({
  id: z.string(),
  full_name: z.string(),
  avatar_url: z.string(),
  email: z.string(),
  phone: z.number(),
  bio: z.string(),
  country: z.string(),
  city: z.string(),
  department: z.string(),
  created_at: z.coerce.date(),
  user_profile_preferences: UserProfilePreferencesSchema,
  questions: z.number(),
  question_comments: z.number(),
  user_reputation: UserReputationSchema,
  user_achievements: z.array(UserAchievementSchema),
});
export type UserSchema = z.infer<typeof User>;
