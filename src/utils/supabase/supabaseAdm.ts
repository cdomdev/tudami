import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "KEYS no configuradas en el cliente de Supabase: SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY"
  );
}



export const supabaseAdm = createClient(supabaseUrl, supabaseKey);
