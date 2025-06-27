"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useState } from "react";
import { preguntaSchema } from "../schema/schemaEditor";
import { toast } from "sonner";
import { useSession } from "@/context/context.sesion";
import { createQuestion } from "../lib/createQuestions";
import { useRouter } from "next/navigation";

export default function Editor() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSession();

  const router = useRouter();

  async function handleSubmit() {
    if (!user) {
      toast.error("Debes iniciar sesión para enviar una pregunta.");
      return;
    }

    setLoading(true);
    const result = preguntaSchema.safeParse({ title, content });

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
      const res = await createQuestion(result.data.title, result.data.content);
      if (!res || !res.success) {
        throw new Error("Error al crear la pregunta");
      }

      toast.success("¡Pregunta publicada con éxito!");
      router.push(`/create-questions/status?text=pregunta-creada-con-exito`);

      // Limpiar el formulario
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

  return (
    <>
      <div className="md:col-span-4 w-full rounded-xs shadow-sm order-2 lg:order-1">
        <div className="mb-2 bg-accent dark:bg-[#252627] p-6">
          <label htmlFor="titulo" className="font-medium text-sm md:text-base">
            Dale un título claro a tu pregunta
          </label>
          <input
            type="text"
            id="titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: ¿Cómo vincular varias evidencias en Sofiaplus?"
            className="w-full border py-2 px-3 mt-2 rounded-md focus:outline-none text-xs md:text-sm focus:ring-1 focus:ring-primary bg-white text-black"
          />
        </div>

        <div className="bg-accent dark:bg-[#252627] p-6">
          <span className="font-medium text-sm md:text-base block mb-3">
            Escribe tu pregunta con detalle
          </span>
          <SimpleEditor onChange={setContent} />
          <button
            onClick={handleSubmit}
            className="mt-3 w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 duration-200 rounded-md cursor-pointer text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando pregunta..." : "Publicar mi pregunta"}
          </button>
        </div>
      </div>
    </>
  );
}
