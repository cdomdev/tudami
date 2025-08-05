import z from "zod";
import { User } from '@/schemas/schema.user'

export const QuestionSchema = z.object({
  id: z.number(),
});
export type Question = z.infer<typeof QuestionSchema>;

export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
  slug: z.string().optional(),
});

export type Tag = z.infer<typeof TagSchema>;

export const QuestionTagSchema = z.object({
  tag: TagSchema,
});

export type QuestionTag = z.infer<typeof QuestionTagSchema>;

export const SchemaPostSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  title: z.string(),
  content: z.string(),
  status: z.string(),
  created_at: z.coerce.date(),
  users: User,
  question_tags: z.array(QuestionTagSchema),
  question_likes: z.array(QuestionSchema),
  question_comments: z.array(QuestionSchema),
});

export type SchemaPost = z.infer<typeof SchemaPostSchema>;


export const SchemaPostResponse = z.object({
  data: z.array(SchemaPostSchema),
  count: z.number(),
});

export type SchemaPostResponse = z.infer<typeof SchemaPostResponse>;