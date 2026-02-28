"use client";

import { SimpleEditor } from "@/components/ui/editor/simple/simple-editor";
import { useState } from "react";
import {  Question } from "@/schemas";
import { toast } from "sonner";
import { useSession } from "@/context/context.sesion";
import { createQuestionApi } from "../lib/createQuestions";
import { useRouter } from "next/navigation";
import tags from "@/content/tags/data-tags.json";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


export default function Editor() {
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const options = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const [loading, setLoading] = useState(false);
  const { user } = useSession();

  const router = useRouter();

  const FormSchema = z.object({
    title: z
      .string()
      .min(10, { message: "El título debe tener al menos 10 caracteres" })
      .max(100, { message: "El título no puede exceder los 100 caracteres" }),
    tags: z
      .array(z.string())
      .min(1, { message: "Debes seleccionar al menos una etiqueta" }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      tags: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user) {
      toast.error("Debes iniciar sesión para enviar una pregunta.");
      return;
    }

    if (!content.trim()) {
      toast.error("Debes escribir el contenido de tu pregunta");
      return;
    }

    setLoading(true);
    const result = Question.safeParse({ title: data.title, content });

    if (!result.success) {
      setLoading(false);
      toast.error(
        `Error en el formulario: ${result.error.errors
          .map((e) => e.message)
          .join(", ")}`
      );
      return;
    }

    try {
      const res = await createQuestionApi(
        result.data.title,
        result.data.content,
        data.tags
      );
      if (!res || !res.success) {
        throw new Error("Error al crear la pregunta");
      }

      toast.success("¡Pregunta publicada con éxito!");
      router.push(`/questions/create/status?res=pregunta-creada-con-exito`);

      form.reset();
      setContent("");
      setSelectedTags([]);
    } catch (error) {
      console.error("Error al enviar la pregunta:", error);
      toast.error(
        "Error al enviar la pregunta. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  }

  const submitButtonText = loading ? "Enviando pregunta" : "Enviar mi pregunta";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* Sección del Título */}
        <section className="p-6">
          <div className="space-y-3">
            <label htmlFor="titulo" className="font-semibold text-sm md:text-base text-foreground">
              Dale un título claro a tu pregunta
            </label>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="titulo"
                      placeholder="Ej: ¿Cómo vincular varias evidencias en Sofiaplus?"
                      {...field}
                      disabled={loading}
                      maxLength={100}
                      className="w-full text-xs md:text-sm transition-colors mt-3  bg-gray-100 dark:bg-slate-50 text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Sección de Etiquetas */}
        <section className="px-6">
          <div className="space-y-3">
            <label
              htmlFor="etiquetas"
              className="font-semibold text-sm md:text-base text-foreground block"
            >
              Selecciona etiquetas relevantes
            </label>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultiSelect
                      id="etiquetas"
                      options={options}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* Sección del Editor */}
        <section className="p-6">
          <div className="space-y-3">
            <label
              htmlFor="editor"
              className="font-semibold text-sm md:text-base text-foreground block"
            >
              Escribe tu pregunta con detalle
            </label>
            <SimpleEditor onChange={setContent} />
          </div>

          {/* Botón de Envío */}
          <Button
            type="submit"
            variant="default"
            disabled={loading}
            className="mt-6 px-4 md:min-w-80 duration-200 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && <Spinner className="w-4 h-4" />}
            {submitButtonText}
          </Button>
        </section>
      </form>
    </Form>
  );
}
