import { supabase } from "./supabase";

export async function subscribe(email: string) {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email });

  if (error) {
    console.error("Error subscribing to changes:", error);
  }

  return { data, error };
}
