import { SupabaseClient } from "@supabase/supabase-js";
import { SchemaResources } from "@/schemas";

export async function saveResourceHelper(
  dataResource: SchemaResources,
  supabase: SupabaseClient,
  isAdmin: boolean | string
) {
  const formatedResource = {
    title: dataResource.title,
    description: dataResource.description,
    slug: dataResource.title.toLowerCase().replaceAll(" ", ""),
    category: dataResource.category,
    url_image: isAdmin === true ? dataResource.image : "",
    public: isAdmin === true ? true : false,
    type: dataResource.type,
  };

  const { data, error } = await supabase
    .from("resources")
    .insert(formatedResource)
    .select("id")
    .single();
  if (!data || error) {
    throw new Error("Error al agregar un recuros en ruta api");
  }

  const dataDetail = await saveDetaislResources(
    dataResource,
    supabase,
    data?.id
  );
  return dataDetail;
}

async function saveDetaislResources(
  dataResource: SchemaResources,
  supabase: SupabaseClient,
  idResource: string
) {
  const titleDetails = dataResource.detail_title;
  const descriptionDetails = dataResource.detail_desciption;

  if (!idResource) {
    throw new Error(
      "Se requiere de un identificador de recurso para los datelles"
    );
  }

  const formatedDetails = {
    title: titleDetails,
    description: descriptionDetails,
    resource_id: idResource,
    url_resource: dataResource.url,
  };

  const { data, error } = await supabase
    .from("details_resources")
    .insert(formatedDetails)
    .select("id")
    .single();

  if (!data || error) {
    throw new Error("Error al agregar los datalles de un recuros en ruta api");
  }

  return {
    sucess: true,
    message: "Contenido agregado con exito",
  };
}

export async function updateResourceHelper(
  dataResource: SchemaResources,
  supabase: SupabaseClient,
  id: number
) {
  const formatedResource = {
    title: dataResource.title,
    description: dataResource.description,
    slug: dataResource.title.toLowerCase().replaceAll(" ", ""),
    category: dataResource.category,
    url_image: dataResource.image,
    public: true,
    type: dataResource.type,
  };

  const { data, error } = await supabase
    .from("resources")
    .update(formatedResource)
    .eq("id", id)
    .select("id")
    .single();

  if (!data || error) {
    throw new Error("Error al agregar un recuros en ruta api");
  }

  const dataDetail = await updateDetaislResources(
    dataResource,
    supabase,
    data?.id
  );
  return dataDetail;
}

async function updateDetaislResources(
  dataResource: SchemaResources,
  supabase: SupabaseClient,
  idResource: string
) {
  const titleDetails = dataResource.detail_title;
  const descriptionDetails = dataResource.detail_desciption;

  if (!idResource) {
    throw new Error(
      "Se requiere de un identificador de recurso para los datelles"
    );
  }

  const formatedDetails = {
    title: titleDetails,
    description: descriptionDetails,
    resource_id: idResource,
    url_resource: dataResource.url,
  };

  const { data, error } = await supabase
    .from("details_resources")
    .update(formatedDetails)
    .eq("resource_id", idResource);

  if (!data || error) {
    throw new Error("Error al agregar los datalles de un recuros en ruta api");
  }

  return {
    sucess: true,
    message: "Contenido actulizado con exito",
  };
}
