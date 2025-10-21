import tags from "@/content/tags/data-tags.json" assert { type: "json" };
import { supabaseAdm } from "@/utils/supabase/supabaseAdm";

async function seedTags() {
  const tagsWithId = tags.map((tag) => ({
    ...tag,
    id_tag: tag.id_tag ?? `tag_${tag.slug}`,
  }));

  const { data, error } = await supabaseAdm.from("tags").insert(tagsWithId);
  if (error) {
    console.error("❌ Error insertando tags:", error.message);
  } else {
    console.log("✅ Tags insertados correctamente:", data);
  }
}

seedTags();
