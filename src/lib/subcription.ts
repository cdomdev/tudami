import { SupabaseClient } from "@supabase/supabase-js";
import { toast } from "sonner";

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
  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: email });

  if (error?.code === "23505") {
    toast.error("Ya estás suscrito a nuestro boletín.");
  }

  return { data };
}
