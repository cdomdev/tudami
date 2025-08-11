import { z } from "zod";

export const Question = z.object({
    title: z.string().min(10, "El título debe tener al menos 10 caracteres"),
    content: z.string().min(20, "El contenido debe tener al menos 20 caracteres"),
});

export type CreateQuestion = z.infer<typeof Question>;

export const Offers = z.object({
    title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
    content: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
});

export type CreateOffer = z.infer<typeof Offers>;