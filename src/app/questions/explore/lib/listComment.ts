import { supabase } from "@/utils/supabase/supabaseClient";

export async function getCommentBy(question_id: number) {
    const { data, error } = await supabase.from(
        "question_comments")
        .select(`*, users:users(id, full_name, avatar_url) `)
        .eq("question_id", question_id)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error en getCommentBy:", error)
        throw new Error(error.message)
    }

    return { comments: data ?? [] }

}