import  z from "zod";
import {UserSchema} from "./schema.user"

export const SchemaCommentSchema = z.object({
    "id": z.number(),
    "text": z.string(),
    "question_id": z.number(),
    "user_id": z.string(),
    "created_at": z.coerce.date(),
    "users": UserSchema,
});

export type SchemaComment = z.infer<typeof SchemaCommentSchema>;
