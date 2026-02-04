"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { SchemaNews, FormSchemaNews } from "@/schemas";
import { uploadImage, saveNews } from "../../_lib";
import { FieldDescription } from "./FieldDescription";
import { UploadImage } from "./UploadImage";
import { useSearchParams } from "next/navigation";
import { listDataNewsBy } from "../../_lib/news";
import { Textarea } from "@/components/ui/textarea";
import { RenderContent } from "@/app/questions/explore/components/RenderContent";
import { Edit } from "lucide-react";

export function FormEditNew() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [dataNew, setDataNew] = useState<SchemaNews | null>(null);
  const [viewEditor, setViewEditor] = useState<boolean>(false);
  const params = useSearchParams();
  const slug = params.get("slug") || "";

  useEffect(() => {
    async function fetchData() {
      setIsloading(true);
      const res = await listDataNewsBy(slug);
      setDataNew(res);
      setIsloading(false);
    }
    fetchData();
  }, [slug]);

  const form = useForm<z.infer<typeof FormSchemaNews>>({
    resolver: zodResolver(FormSchemaNews),
    defaultValues: {
      title: "",
      sub_title: "",
      description: "",
      image: "",
      source: "",
      url_source: "",
    },
  });

  useEffect(() => {
    if (dataNew) {
      form.reset({
        title: dataNew.title,
        sub_title: dataNew.sub_title,
        description: dataNew.description,
        image: dataNew.image,
        source: dataNew.source,
        url_source: dataNew.url_source,
      });
    }
  }, [dataNew, form]);

  async function onSubmit(data: SchemaNews) {
    setIsloading(true);
    try {
      if (data.image && data.image instanceof File) {
        const res = await uploadImage(
          data.image,
          data.title.toLowerCase(),
          "files"
        );
        setImage(res?.url || null);
      }

      // formatear datos para la tabla
      const formattedData = {
        id: 0,
        title: data.title,
        sub_title: data.sub_title,
        description: data.description,
        image: image || "",
        source: data.source,
        url_source: data.url_source,
      };

      const res = await saveNews(formattedData);
      setImage(null);

      console.log(res);

      if (res) toast.success("Recurso agregado con exito");

      form.reset({
        title: "",
        sub_title: "",
        description: "",
        image: "",
        source: "",
        url_source: "",
      });
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* titulo */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titulo de la noticia</FormLabel>
              <FormControl>
                <Input placeholder="TItulo de la noticia" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* subtitle */}
        <FormField
          control={form.control}
          name="sub_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitulo de noticia</FormLabel>
              <FormControl>
                <Textarea {...field} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* url  */}
        <FormField
          control={form.control}
          name="url_source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Origen de la noticia</FormLabel>
              <FormControl>
                <Input placeholder="https://source.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* origen */}

        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Autor u Origen</FormLabel>
              <FormControl>
                <Input
                  placeholder="Origen de la noticia ej: El Diario As"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <UploadImage control={form.control} url_image={dataNew?.image || ""} />


        {/* description */}
        <Button onClick={() => setViewEditor(!viewEditor)}><Edit />{`${viewEditor ? "Cancelar" : "Editar contenido"} `}</Button>
        {viewEditor ? (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={20} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <RenderContent content={form.watch("description") || ""} />
        )}
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading && <Spinner className="w-5 h-5" />}
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
