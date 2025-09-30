import { toast } from "sonner";
import { supabase } from "@/utils/supabase/supabaseClient";

export async function subscribe(email: string) {
  const url = "api/subcription/new";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  return data;
}

export async function alternativeSubcription(email: string) {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email, is_active: true });

  if (error?.code === "23505") {
    toast.error("Ya estás suscrito a nuestro boletín.");
  }

  return { data, error };
}
