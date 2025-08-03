import { z } from "zod";

export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    full_name: z.string(),
    avatar_url: z.string().nullable(),
    provider: z.string(),

    phone: z.string().optional(),
    bio: z.string().optional(),
    city: z.string().optional(),
    department: z.string().optional(),
    country: z.string().default("Colombia"),
    approval_token: z.string().optional(),
    created_at: z.coerce.date(),

    user_profile_preferences: z.object({
        profile_public: z.boolean(),
        allow_email: z.boolean(),
        allow_whatsapp: z.boolean(),
    }),

    user_reputation: z.object({
        questions: z.number(),
        responses: z.number(),
        score: z.string(),
    }),

    user_achievements: z.object({
        id: z.string().nullable(),
        achievement_id: z.string().nullable(),
    }),
});

export type UserSchema = z.infer<typeof UserSchema>;

