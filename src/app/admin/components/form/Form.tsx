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
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components";
import { toast } from "sonner";
import { FormSchemaResources, SchemaResources } from "@/schemas";
import { saveResource, uploadImage } from "../../_lib";
import { useRouter } from "next/navigation";
import { categoriesNames, typeResource } from "./formData";

export function FormNewResounce({
  isAdmin,
  urlRedirect,
}: {
  isAdmin: boolean;
  urlRedirect?: string;
}) {
  const [isLoading, setIsloading] = useState<boolean>(false);

  const router = useRouter();
  const url = urlRedirect || "";
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

  async function onSubmit(data: SchemaResources) {
    setIsloading(true);
    try {
      let imageResource;
      if (data.image && data.image instanceof File) {
        const res = await uploadImage(data.image, data.category.toLowerCase(), "resources");
        imageResource = res?.url;
      }

      // formatear datos para la tabla
      const formattedData = {
        title: data.title,
        description: data.description,
        image: imageResource || "",
        category: data.category,
        url: data.url,
        type: data.type,
        detail_title: data.detail_title,
        detail_desciption: data.detail_desciption,
      };

      const res = await saveResource(formattedData, isAdmin);
      if (res) toast.success("Recurso agregado con exito");

      form.reset({
        title: "",
        description: "",
        image: "",
        category: "",
        detail_title: "",
        detail_desciption: "",
        url: "",
        type: "",
      });
      router.push(url);
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

        {isAdmin && <UploadImage control={form.control} />}

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
          {isLoading ? "Enviando..." : "Enviar"}
        </Button>
      </form>
    </Form>
  );
}
