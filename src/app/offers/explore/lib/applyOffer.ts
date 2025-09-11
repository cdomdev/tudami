import { supabase } from "@/utils/supabase/supabaseClient";

export async function applyOffer(offer_id: number, user_id: string) {
  const path = `/api/offers/explore/apply?offer_id=${offer_id}&user_id=${user_id}`;
  const res = await fetch(path, { method: "POST" });

  if (!res.ok) throw new Error("Error on apply offer");

  return await res.json();
}

export async function deleteApplyOffer(offer_id: number, user_id: string) {
  const path = `/api/offers/explore/delete?offer_id=${offer_id}&user_id=${user_id}`;
  const res = await fetch(path, { method: "DELETE" });

  if (!res.ok) throw new Error("Error on delete apply");

  return { success: true };
}

export const toggleApply = async (offer_id: number, user_id: string) => {
  const { data } = await supabase
    .from("offers_applications")
    .select("id")
    .eq("offer_id", offer_id)
    .eq("user_id", user_id)
    .maybeSingle();
  return !!data;
};

// export async function toggleApply(offer_id: number, user_id: string) {
//   const path = `/api/offers/explore/toggle?offer_id=${offer_id}&user_id=${user_id}`;
//   const res = await fetch(path, { method: "POST" });

//   console.log("Toggle apply response:", res);
//   if (!res.ok) throw new Error("Error on toggle apply");

//   return { success: true };
// }
