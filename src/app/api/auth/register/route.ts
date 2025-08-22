import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { SupabaseClient} from "@supabase/supabase-js";
import { generateApprovalToken } from "../utils/generateTokenAprov";

export async function POST(request: Request) {
  const { full_name, email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const supabase = await supabaseServerClient();
  try {
    const res = await registerUser(full_name, email, password, supabase);
    return NextResponse.json(res);
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function registerUser(
  full_name: string,
  email: string,
  password: string,
  supabase: SupabaseClient
) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw new Error(error.message);

  const userId = data.user?.id;
  if (!userId) throw new Error("No se pudo obtener el ID del usuario");

  const dataProfile = await updateProfile(userId, full_name, supabase);

  return dataProfile;
}

async function updateProfile(
  userId: string,
  full_name: string,
  supabase: SupabaseClient
) {
  const approvalToken = generateApprovalToken(userId);
  const { data, error } = await supabase
    .from("users")
    .upsert([{ full_name, token_aprov: approvalToken }])
    .select("id")
    .single();
  if (error) {
    throw new Error(error.message);
  }
  await definePreference(data.id, supabase);

  return data;
}

async function definePreference(user_id: string, supabase: SupabaseClient) {
  const { data: existingPreferences } = await supabase
    .from("user_profile_preferences")
    .select("user_id")
    .eq("user_id", user_id)
    .single();

  if (!existingPreferences) {
    const { error } = await supabase.from("user_profile_preferences").insert({
      user_id: user_id,
      profile_public: true,
      allow_email: false,
      allow_whatsapp: false,
    });

    if (error) {
      throw new Error(`Error al crear preferencias: ${error.message}`);
    }
  }
}
