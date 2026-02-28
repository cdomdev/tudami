"use client";

import { SimpleEditor } from "@/components/ui/editor/simple/simple-editor";
import { useState } from "react";
import { Offers } from "@/schemas";
import { toast } from "sonner";
import { useSession } from "@/context/context.sesion";
import { addOffer } from "../lib/createOffers";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


export function EditorOffers() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSession();

  const router = useRouter();

  const schema = z.object({
    title: z
      .string()
      .min(10, { message: "El título debe tener al menos 10 caracteres" })
      .max(100, { message: "El título no puede exceder los 100 caracteres" }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: "" },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    if (!user) {
      toast.error("Debes iniciar sesión para enviar una oferta.");
      return;
    }

    if (!content.trim()) {
      toast.error("Debes detallar tu oferta");
      return;
    }

    setLoading(true);
    const result = Offers.safeParse({ title: data.title, content });

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

      form.reset();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {/* título */}
        <section className="p-6">
          <div className="space-y-3">
            <label htmlFor="titulo" className="font-semibold text-sm md:text-base text-foreground">
              Dale un título claro a tu oferta
            </label>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="titulo"
                      placeholder="Ej: Diseño de logo para tienda online - pago acordado"
                      {...field}
                      disabled={loading}
                      maxLength={100}
                      className="w-full text-xs md:text-sm transition-colors mt-3 bg-gray-100 dark:bg-slate-50 text-black "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        {/* editor */}
        <section className="px-6">
          <div className="space-y-3">
            <label htmlFor="editor" className="font-semibold text-sm md:text-base text-foreground block">
              Escribe tu oferta con detalle
            </label>
            <SimpleEditor onChange={setContent} />
          </div>

          <Button
            type="submit"
            variant="default"
            disabled={loading}
            className="mt-6 px-4 duration-200 rounded-md cursor-pointer font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && <span className="spinner-border w-4 h-4" />} {loading ? "Enviando oferta..." : "Publicar mi oferta"}
          </Button>
        </section>
      </form>
    </Form>
  );
}
