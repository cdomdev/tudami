import { supabase } from "@/utils/supabase/supabaseClient";

interface DataOpinion {
  opinion: string;
  rating: number;
  user_id: string;
}

export async function opinion(dataOpinion: DataOpinion) {
  try {
    // Verificar si el usuario ya opinó
    const { data: existing, error: searchError } = await supabase
      .from("opinions")
      .select("id")
      .eq("user_id", dataOpinion.user_id)
      .single();

    if (searchError && searchError.code !== "PGRST116") {
      throw searchError;
    }

    let result;

    // Actualiza si ya existe una opinión del usuario
    if (existing) {
      result = await supabase
        .from("opinions")
        .update({
          opinion: dataOpinion.opinion,
          rating: dataOpinion.rating,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", dataOpinion.user_id);
    } else {
      // Crea una nueva si no existe
      result = await supabase.from("opinions").insert(dataOpinion);
    }

    if (result.error) throw result.error;
    return { error: null };
  } catch (error) {
    console.error("Error en el proceso de opinión:", error);
    return { error };
  }
}
