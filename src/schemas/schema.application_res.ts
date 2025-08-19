import z from "zod";
import { User } from "./schema.user";

export const UserPreferencesSchema = z.object({
  allow_email: z.boolean(),
  allow_whatsapp: z.boolean(),
  profile_public: z.boolean(),
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;

export const OfferApplicationSchema = z.object({
  application_id: z.number(),
  offer_id: z.number(),
  user_id: z.string(),
  applied_at: z.coerce.date(),
  user: User,
  preferences: UserPreferencesSchema,
});

export type OfferApplication = z.infer<typeof OfferApplicationSchema>;

export const OfferApplicationsResponse = z.array(OfferApplicationSchema);

export type OfferApplicationsResponse = z.infer<
  typeof OfferApplicationsResponse
>;
