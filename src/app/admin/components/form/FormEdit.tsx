"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { UploadImage } from "./UploadImage";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components";
import { toast } from "sonner";
import {
  FormSchemaResources,
  SchemaResoucesResponse,
  SchemaResources,
} from "@/schemas";
import { uploadImage } from "../../lib";
import { listDataResourceBy, updateResource } from "../../lib/resources";
import { categoriesNames, typeResource } from "./formData";

export function FormEditResounce({ isAdmin }: { isAdmin: boolean }) {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [dataResource, setDataResource] = useState<SchemaResoucesResponse>();

  const params = useSearchParams();
  const slug = params.get("slug") || "";

  useEffect(() => {
    listDataResourceBy(slug).then((res) => {
      setDataResource(res?.data);
    });
  }, [slug]);

  const form = useForm<z.infer<typeof FormSchemaResources>>({
    resolver: zodResolver(FormSchemaResources),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      category: "",
      detail_title: "",
      detail_desciption: "",
      url: "",
      type: "",
    },
  });

  useEffect(() => {
    if (dataResource) {
      form.reset({
        title: dataResource.title,
        description: dataResource.description,
        image: dataResource.url_image,
        category: dataResource.category,
        detail_title: dataResource.details_resources[0]?.title || "",
        detail_desciption: dataResource.details_resources[0]?.description || "",
        url: dataResource.details_resources[0]?.url_resource || "",
        type: dataResource.type || "",
      });
    }
  }, [dataResource, form]);

  async function onSubmit(data: SchemaResources) {
    setIsloading(true);
    try {
      let imageResource = dataResource?.url_image;
      if (data.image instanceof File) {
        const res = await uploadImage(data.image, data.category.toLowerCase());
        imageResource = res?.url;
      } else if (typeof data.image === "string" && data.image.trim() !== "") {
        imageResource = data.image;
      }

      const formattedData: SchemaResources = {
        title: data.title ?? dataResource?.title ?? "",
        description: data.description ?? dataResource?.description ?? "",
        image: imageResource ?? dataResource?.url_image ?? "",
        category: data.category ?? dataResource?.category ?? "",
        url: data.url ?? dataResource?.details_resources[0]?.url_resource ?? "",
        type: data.type ?? dataResource?.type ?? "",
        detail_title:
          data.detail_title ?? dataResource?.details_resources[0]?.title ?? "",
        detail_desciption:
          data.detail_desciption ??
          dataResource?.details_resources[0]?.description ??
          "",
      };

      const res = await updateResource(formattedData, dataResource?.id);
      console.log(res)
      if (res.status === 201) toast.success("Recurso actulizado con exito");
      // form.reset({
      //   title: "",
      //   description: "",
      //   image: "",
      //   category: "",
      //   detail_title: "",
      //   detail_desciption: "",
      //   url: "",
      //   type: "",
      // });
    } catch (error) {
      console.error("Error add resourse:", error);
      toast.error(
        `Error: ${error instanceof Error ? error.message : "Error desconocido"}`
      );
    } finally {
      setIsloading(false);
    }
  }

  return (
    <Form key={dataResource?.id} {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* titulo */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo para el nuevo recurso</FormLabel>
              <FormControl>
                <Input placeholder="Academia dev" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* descripcion */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="Descripcion del recurso"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* url  */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Direccion del recurso</FormLabel>
              <FormControl>
                <Input placeholder="https://recurso.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* categoria */}

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seleccionar la categoria del recurso</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger className="bg-white/70 text-black dark:text-muted-foreground">
                    <SelectValue placeholder="Selecciona un categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesNames.map((cat) => (
                      <SelectItem key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* tipo - gratis o pago */}

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Seleccionar el tipo de recurso</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="bg-white/70 text-black dark:text-muted-foreground">
                    <SelectValue placeholder="Selecciona el tipo de recurso" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeResource.map((re, i) => (
                      <SelectItem key={i} value={re.value}>
                        {re.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isAdmin && (
          <UploadImage
            control={form.control}
            url_image={dataResource?.url_image}
          />
        )}

        <FormLabel className="font-semibold">
          Agrega algo mas de detalle sobre el nuevo recurso
        </FormLabel>

        {/* detalles */}

        <FormField
          control={form.control}
          name="detail_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo para el detalle de el nuevo recuso</FormLabel>
              <FormControl>
                <Input placeholder="¿Como funciona el recurso?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="detail_desciption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Describe un poco el recurso que se esta agregando
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  placeholder="Ej: Curso interactivo de JavaScript con ejemplos prácticos y ejercicios para principiantes."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading && <Spinner className="w-5 h-5" />}
          {isLoading ? "Actualizando..." : "Actualizar"}
        </Button>
      </form>
    </Form>
  );
}
