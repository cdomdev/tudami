import "dotenv/config"
import {config} from "dotenv"
import { createClient } from "@supabase/supabase-js";
import tags from "@/content/tags/data-tags.json" assert { type: "json" };

config({path: ".env.local"});   

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Error al cargar variables de entorno");
}

// Crea el cliente con las variables de entorno
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


async function seedTags() {
  const tagsWithId = tags.map((tag) => ({
    ...tag,
    id_tag: tag.id_tag ?? `tag_${tag.slug}`,
  }));

  const { data, error } = await supabase.from("tags").insert(tagsWithId);
  if (error) {
    console.error("❌ Error insertando tags:", error.message);
  } else {
    console.log("✅ Tags insertados correctamente:", data);
  }
}


seedTags();
