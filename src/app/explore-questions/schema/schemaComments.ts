import * as z from "zod";

export const UsersSchema = z.object({
    "id": z.string(),
    "full_name": z.string(),
    "avatar_url": z.string(),
});
export type Users = z.infer<typeof UsersSchema>;

export const SchemaCommentSchema = z.object({
    "id": z.number(),
    "text": z.string(),
    "question_id": z.number(),
    "user_id": z.string(),
    "created_at": z.coerce.date(),
    "user": UsersSchema,
});

export type SchemaComment = z.infer<typeof SchemaCommentSchema>;
