import { supabase } from "@/lib/supabase";

export function buildQuestionsQuery(from: number | 0, to: number | 999
) {
  return supabase.from("questions").select(
    `
      *,
      users:users (
        id,
        full_name,
        avatar_url
      ),
      question_tags (
        tag:tags (
          id,
          name,
          color
        )
      ),
      question_likes (
        id
      ), 
      question_comments (
        id
      )
      `,
    { count: "exact" }
  )
    .order("created_at", { ascending: false })
    .range(from, to)
}
