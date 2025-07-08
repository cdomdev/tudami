import { supabase } from "@/lib/supabase";

export async function toggleSave(question_id: number, user_id: string) {
  const { data: existing } = await supabase
    .from("questions_saveds")
    .select("id")
    .eq("question_id", question_id)
    .eq("user_id", user_id)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("questions_saveds")
      .delete()
      .eq("id", existing.id);
    return { saved: false, error };
  } else {
    const { error } = await supabase
      .from("questions_saveds")
      .insert({ question_id, user_id });
    return { saved: true, error };
  }
}

export async function isQuestionSaved(question_id: number, user_id: string) {
  const { data } = await supabase
    .from("questions_saveds")
    .select("id")
    .eq("question_id", question_id)
    .eq("user_id", user_id)
    .maybeSingle();

  return !!data;
}
