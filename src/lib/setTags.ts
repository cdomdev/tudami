import { supabase } from "@/utils/supabase/supabaseClient";
import tags from "@/content/tags/data-tags.json" assert { type: "json" };

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
