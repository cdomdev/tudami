import { supabase } from "@/utils/supabase/supabaseClient";

export async function createComment(
  text: string,
  question_id: number,
  user_id: string
) {
  const urlReques = "/api/questions/explore/comment/new";
  try {
    const res = await fetch(urlReques, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        question_id,
        user_id,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to create comment", { cause: res.status });
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error creating notification:[LIB CREATE]", error);
    throw new Error("Failed to create notification");
  }
}

export async function getCommentBy(question_id: number) {
  try {
    const urlReques = `/api/questions/explore/comment/get?question_id=${question_id}`;
    const res = await fetch(urlReques, {
      method: "GET",
    });
    const data = await res.json();
    return { comments: data ?? [] };
  } catch (error) {
    console.log("Error fetching comments:[LIB GET]", error);
    throw new Error("Failed to fetch comments");
  }
}

export async function countComments(question_id: number) {
  try {
    const { count } = await supabase
      .from("question_comments")
      .select("*", { count: "exact", head: true })
      .eq("question_id", question_id);
    return typeof count === "number" ? count : 0;
  } catch (error) {
    console.log("Error counting comments:[LIB COUNT]", error);
    throw new Error("Failed to count comments");
  }
}
