import { supabase } from "@/utils/supabase/supabaseClient";

export async function registerUser({
  //   full_name,
  email,
  password,
}: {
  full_name: string;
  email: string;
  password: string;
}) {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const { data } = await supabase.auth.signUp({ email, password });
  console.log("Supabase response:", data);

  //   const res = await fetch("/api/auth/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       full_name,
  //       email,
  //       password,
  //     }),
  //   });

  //   console.log("Response[REGISTER]:", res);
  //   if (!res.ok) {
  //     throw new Error("Failed to register user");
  //   }
  //   const data = await res.json();
  //   return data;
}
