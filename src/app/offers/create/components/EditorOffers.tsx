"use client";

import { SimpleEditor } from "@/components/ui/editor/simple/simple-editor";
import { useState } from "react";
import { Offers } from "@/schemas";
import { toast } from "sonner";
import { useSession } from "@/context/context.sesion";
import { addOffer } from "../lib/createOffers";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export function EditorOffers() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSession();

  const router = useRouter();

  async function handleSubmit() {
    if (!user) {
      toast.error("Debes iniciar sesión para enviar una oferta.");
      return;
    }

    setLoading(true);
    const result = Offers.safeParse({ title, content });

    
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
        const res = await addOffer(result.data.title, result.data.content);
      if (!res || !res.success) {
        throw new Error("Error al crear la oferta");
      }

      toast.success("¡Oferta publicada con éxito!");
      router.push(`/offers/create/status?res=pregunta-creada-con-exito`);

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error al enviar la oferta:", error);
      toast.error(
        "Error al enviar la oferta. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="p-6">
        <label htmlFor="titulo" className="font-medium text-sm md:text-base">
          Dale un título claro a tu oferta
        </label>
        <input
          type="text"
          id="titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Diseño de logo para tienda online - pago acordado"
          className="w-full border py-2 px-3 mt-2 rounded-md focus:outline-none text-xs md:text-sm focus:ring-1 focus:ring-slate-200 bg-white text-black"
        />
      </div>
      <div className="px-6 ">
        <span className="font-medium text-sm md:text-base block mb-3">
          Escribe tu oferta con detalle
        </span>
        <SimpleEditor onChange={setContent} />
        <Button
          variant={"default"}
          onClick={handleSubmit}
          className="mt-3 px-4   duration-200 rounded-md cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando oferta..." : "Publicar mi oferta"}
        </Button>
      </div>
    </>
  );
}
