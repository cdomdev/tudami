"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { alternativeSubcription, subscribe } from "@/lib/subcription";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor ingresa un correo electrónico válido." }),
});

export function FormSubcription() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const { error } = await subscribe(values.email.toLocaleLowerCase());
    if (error) {
      if (error.code === "23505") {
        toast.error("Ya estás suscrito a nuestro boletín.");
      } else if (error === "Error processing request") {
        await alternativeSubcription(values.email.toLocaleLowerCase());
      } else {
        toast.error("No pudimos suscribirte. Inténtalo de nuevo más tarde.");
      }
    } else {
      toast.success("Te has suscrito correctamente. ¡Gracias!");
      form.reset();
    }
    } catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false);
    }
    
  }
  return (
    <>
      <div className="mb-32 w-11/12 md:w-full md:max-w-4xl mx-auto p-6 sm:p-8 dark:bg-custom-card border border-muted rounded-xl shadow-sm flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Image src="/Email.svg" alt="imagen-buzon" width={30} height={30} />
            <h2 className="text-lg md:text-2xl font-bold">
              ¿Quieres mantenerte al día?
            </h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base mt-1 text-balance">
            Recibe una notificación por correo electrónico cuando publiquemos un
            nuevo artículo con recursos, tips y consejos útiles para aprendices
            como tú.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tu correo electrónico</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="usuario@correo.com"
                      {...field}
                      className="md:w-md text-xs md:text-sm"
                    />
                  </FormControl>
                  <FormDescription>
                    Solo te notificaremos sobre nuevos artículos. Sin spam.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Button type="submit" className="cursor-pointer">
                {loading ? "Suscribiéndote..." : "Notificarme cuando haya nuevo contenido"}
              </Button>
              <p className="text-xs  text-muted-foreground">
                Puedes darte de baja en cualquier momento.
              </p>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
