import z from "zod";
import { User } from './schema.user'


export const QuestionSchema = z.object({
  id: z.number(),
});

export type Question = z.infer<typeof QuestionSchema>;

export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string(),
});

export type Tag = z.infer<typeof TagSchema>;


export const QuestionTagSchema = z.object({
  tag: TagSchema,
});

export type QuestionTag = z.infer<typeof QuestionTagSchema>;

export const QuestionsSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  created_at: z.coerce.date(),
  question_tags: z.array(QuestionTagSchema),
  question_likes: z.array(QuestionSchema),
  question_comments: z.array(QuestionSchema),
  user: User
});
export type Questions = z.infer<typeof QuestionsSchema>;

export const SchemaQuestionsSavedsSchema = z.object({
  id: z.number(),
  questions: QuestionsSchema,
});
export type SchemaQuestionsSaveds = z.infer<typeof SchemaQuestionsSavedsSchema>;
