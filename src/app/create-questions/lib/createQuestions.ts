import { supabase } from "@/lib/supabase";

export async function createQuestion(
  title: string,
  content: string,
  tags: string[] = []
) {
  const { data: sessionData } = await supabase.auth.getUser();
  const userId = sessionData?.user?.id;


  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  const { data, error } = await supabase
    .from("questions")
    .insert([
      {
        user_id: userId,
        title,
        content,
        status: "pendiente",
      },
    ])
    .select("id");

  if (error) {
    throw new Error(`Error al guardar en Supabase: ${error.message}`);
  }


  // // inserta tags en la tabla de relacion entre questions y tags
  if (data && tags.length > 0) {
    const tagInserts = tags.map((tag) => ({
      question_id: data[0]?.id,
      tag_id: tag,
    }));

    const { error: tagError } = await supabase
      .from("questions_tags")
      .insert(tagInserts);

    if (tagError) {
      throw new Error(`Error al insertar tags: ${tagError.message}`);
    }
  }

  // validar insignia de pregunta del usuario

  const { count } = await supabase
    .from("questions")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);


  let datainsignia = null;
  // 3. Otorgar la insignia si no la tiene aún
  if (count === 1) {
    const { data: insigniaData, error: insigniaError } = await supabase
      .from("user_achievements")
      .insert([{ user_id: userId, achievement_id: "primera_pregunta" }]);

    if (insigniaError && insigniaError.code !== "23505") {
      console.error("Error otorgando insignia:", insigniaError.message);
    } else if (!insigniaError) {
      console.log("🎉 Insignia 'primera_pregunta' otorgada!");
      datainsignia = insigniaData;
    }
  }

  return {
    success: true,
    data,
    datainsignia,
  };
}
