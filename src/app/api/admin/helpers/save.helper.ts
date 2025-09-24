import { SupabaseClient } from "@supabase/supabase-js";
import { SchemaResources } from "@/schemas";

/**
 * Guardar recursos en db
 * @param dataResource 
 * @param supabase 
 * @param isAdmin 
 * @returns 
 */
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

/**
 * Guardar detalles de recursos en db
 * @param dataResource 
 * @param supabase 
 * @param idResource 
 * @returns 
 */
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
    success: true,
    status: 200,
    message: "Contenido agregado con exito",
  };
}



/**
 * Actulizar o modificar recuros en la db
 * @param dataResource 
 * @param supabase 
 * @param id 
 * @returns 
 */
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

  const { error } = await supabase
    .from("resources")
    .update(formatedResource)
    .eq("id", id);

  if (error) {
    return { error: error, message: "Error al actulizar un recuros" };
  }

  const dataDetail = await updateDetaislResources(dataResource, supabase, id);
  return dataDetail;
}
/**
 * Actulizar o modificar detalles de los recursos en l db
 * @param dataResource 
 * @param supabase 
 * @param idResource 
 * @returns 
 */
async function updateDetaislResources(
  dataResource: SchemaResources,
  supabase: SupabaseClient,
  idResource: number
) {
  const titleDetails = dataResource.detail_title;
  const descriptionDetails = dataResource.detail_desciption;

  if (!idResource) {
    return {
      message: "Se requiere de un identificador de recurso para los datelles",
    };
  }

  const formatedDetails = {
    title: titleDetails,
    description: descriptionDetails,
    resource_id: idResource,
    url_resource: dataResource.url,
  };

  const { error } = await supabase
    .from("details_resources")
    .update(formatedDetails)
    .eq("resource_id", idResource);

  if (error) {
    return {
      Error: error,
      message: "Se requiere de un identificador de recurso para los datelles",
    };
  }

  return {
    success: true,
    status: 201,
    message: "Contenido actulizado con exito",
  };
}
