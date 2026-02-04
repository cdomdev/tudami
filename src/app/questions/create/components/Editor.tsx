"use client";

import { SimpleEditor } from "@/components/ui/editor/simple/simple-editor";
import { useState } from "react";
import { Question } from "@/schemas";
import { toast } from "sonner";
import { useSession } from "@/context/context.sesion";
import { createQuestionApi } from "../lib/createQuestions";
import { useRouter } from "next/navigation";
import tags from "@/content/tags/data-tags.json";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function Editor() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const options = tags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  const [loading, setLoading] = useState(false);
  const { user } = useSession();

  const router = useRouter();

  async function handleSubmit() {
    if (!user) {
      toast.error("Debes iniciar sesión para enviar una pregunta.");
      return;
    }

    setLoading(true);
    const result = Question.safeParse({ title, content });

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
        selectedTags
      );
      if (!res || !res.success) {
        throw new Error("Error al crear la pregunta");
      }

      toast.success("¡Pregunta publicada con éxito!");
      router.push(`/questions/create/status?res=pregunta-creada-con-exito`);

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error al enviar la pregunta:", error);
      toast.error(
        "Error al enviar la pregunta. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  }

  const textLoadin = loading ? "Enviando pregunta" : "Enviar mi pregunta";
  return (
    <>
      <div className="p-6">
        <label htmlFor="titulo" className="font-medium text-sm md:text-base">
          Dale un título claro a tu pregunta
        </label>
        <input
          type="text"
          id="titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: ¿Cómo vincular varias evidencias en Sofiaplus?"
          className="w-full border py-2 px-3 mt-2 rounded-md focus:outline-none text-xs md:text-sm focus:ring-1 focus:ring-slate-200 bg-white text-black"
        />
      </div>

      <div className="px-6 ">
        <label htmlFor="etiquetas" id="multi-select-button" className="font-medium text-sm md:text-base">
          Selecciona etiquetas relevantes
        </label>
        <MultiSelect
          id="etiquetas"
          aria-labelledby="multi-select-button"
          options={options}
          onValueChange={setSelectedTags}
          defaultValue={selectedTags}
        />
      </div>

      <div className="p-6 ">
        <label id="editor-label" className="font-medium text-sm md:text-base block mb-3" htmlFor="editor">
          Escribe tu pregunta con detalle
        </label>
        <SimpleEditor onChange={setContent}  />
        <Button
          variant={"default"}
          onClick={handleSubmit}
          disabled={loading}
          className="mt-3 px-4 md:min-w-80 duration-200 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && <Spinner className="w-5 h-5" />} {textLoadin}
        </Button>
      </div>
    </>
  );
}
