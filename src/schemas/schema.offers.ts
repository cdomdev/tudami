import z from "zod";
import { User } from '@/schemas/schema.user'

export const SchemaResOffers = z.object({
    id: z.number(),
    user_id: z.string(),
    title: z.string(),
    details: z.string(),
    status: z.string(),
    users: User,
    offers_aplication: z.number().min(0).default(0),
    created_at: z.coerce.date(),
});

export type SchemaOffers = z.infer<typeof SchemaResOffers>;


export const Response = z.object({
    data: z.array(SchemaResOffers),
    count: z.number(),
});


export type SchemaOffersResponse = z.infer<typeof Response>;