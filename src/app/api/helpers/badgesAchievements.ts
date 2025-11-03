import { SupabaseClient } from "@supabase/supabase-js";
import { error } from "console";

// asigar insignia de logro al usuario

export async function asignBadge(user_id: string, supabaseClient: SupabaseClient, achievement_id: string){
    try {
        const { error: insigniaError, data } = await supabaseClient
        .from("user_achievements")
        .insert([{ user_id: user_id, achievement_id: achievement_id }]);

        if(insigniaError) return {
            success: false,
            errorMessage: insigniaError.message,
            errorCode: insigniaError.code, 
            error
        }

        return {
            success: true,
            data,
            message: `badge asigned type ${achievement_id}`
        } 

    } catch (error) {
        console.log("Error asign badge", error)
        throw error
    }

}


// asignar o actualizar puntuaccion del usuario

export async function upOrAddReputationPoints(
    user_id: string,
    score: number,
    supabaseClient: SupabaseClient
  ) {

    const { data: user, error: userError } = await supabaseClient
      .from("user_reputation")
      .select(`*`)
      .eq("user_id", user_id)
      .single();
  
    if (userError) {
      if (userError.code === "PGRST116") {
        const { error: insertError } = await supabaseClient
          .from("user_reputation")
          .insert({ user_id: user_id, score: score });
  
        if (insertError) {
          console.error(
            "Error al crear registro de reputación:",
            insertError.message
          );
          throw insertError
        }
      }
    }
  
    const currentReputation = user?.score || 0;
  
    // Asignar puntos de reputación
    const newReputation = currentReputation + 5;
  
    const { error: updateError } = await supabaseClient
      .from("user_reputation")
      .update({ score: newReputation })
      .eq("user_id", user_id);
  
    if (updateError) {
      console.error("Error al actualizar reputación:", updateError.message);
      throw updateError
    } 
  }