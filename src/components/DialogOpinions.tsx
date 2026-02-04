"use client";

import { useState } from "react";
import { useSession } from "@/context/context.sesion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { FormRaiting } from "@/schemas";
import { opinion } from "@/lib/opinion";

import { Spinner } from "@/components/ui/spinner";
import { StarRating } from "./StartRating";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogDescription } from "@radix-ui/react-dialog";

export function DialogOpinions({
  variant,
  textBtn,
}: {
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  textBtn: string;
}) {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [success, setSuccess] = useState(false);

  const { user } = useSession();
  const userId = user?.id || "";

  const form = useForm<z.infer<typeof FormRaiting>>({
    resolver: zodResolver(FormRaiting),
    defaultValues: {
      opinion: "",
    },
  });

  async function handle() {
    setLoading(true);

    if (!userId) {
      toast.error(
        "No podemos procesar tu solicitud en este momento. Inténtalo más tarde."
      );
      setLoading(false);
      return;
    }

    const { opinion: opinionText } = form.getValues();

    const formattedData = {
      opinion: opinionText.trim(),
      rating,
      user_id: userId,
    };

    try {
      const { error } = await opinion(formattedData);

      if (error) {
        console.error(error);
        toast.error(
          "Ocurrió un error al enviar tu opinión. Inténtalo más tarde."
        );
      } else {
        setSuccess(true);
        toast.success("¡Gracias por compartir tu opinión sobre Tudami!");
      }
    } catch (error) {
      console.error("Error al enviar la opinión:", error);
      toast.error(
        "Ocurrió un error inesperado. Por favor, inténtalo más tarde."
      );
    } finally {
      setLoading(false);
    }
  }

  const defaultTextBtn = textBtn ?? "Opinar sobre Tudami";
  const existVariant = variant === "ghost";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          className={`cursor-pointer ${existVariant && "p-0 h-0 -translate-x-3 text-foreground font-normal hover:text-blue-600"}`}
        >
          <MessageCircle
            className={`w-5 h-5 mr-2 ${existVariant && "hidden"}`}
          />
          {defaultTextBtn}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tu opinión sobre Tudami</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Cuéntale a la comunidad qué piensas sobre Tudami. Recuerda respetar
            los
            <Link href="/terms#uso" className="text-blue-600 underline ml-1">
              términos de uso de la plataforma.
            </Link>
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-6 text-center space-y-2">
            <h3 className="text-lg font-medium text-green-600">
              ¡Gracias por tu opinión!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
              Valoramos tus comentarios. Nos ayudan a seguir mejorando Tudami
              para ti y para toda la comunidad.
            </p>
            <DialogClose asChild>
              <Button className="cursor-pointer">Cerrar</Button>
            </DialogClose>
          </div>
        ) : !user ? (
          <div className="space-y-3">
            <p className="text-gray-600 dark:text-gray-400 text-balance text-center py-3">
              Para enviar tu opinión sobre Tudami, necesitas iniciar sesión.
            </p>
            <Link href="/auth/login">
              <Button className="cursor-pointer w-full">Iniciar sesión</Button>
            </Link>
          </div>
        ) : (
          <>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handle)}>
                <div className="space-y-4 text-sm">
                  <FormField
                    control={form.control}
                    name="opinion"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <FormLabel htmlFor="opinion">Opinión</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Textarea
                              {...field}
                              rows={6}
                              placeholder="Tu opinion"
                              maxLength={300}
                              aria-describedby={
                                fieldState.error
                                  ? "biografia-error"
                                  : "biografia-description"
                              }
                              aria-invalid={!!fieldState.error}
                            />

                            <div className="absolute bottom-2 right-2 text-xs text-black dark:text-muted-foreground">
                              {field.value?.length || 0}/300
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Calificación</FormLabel>
                    <StarRating
                      value={rating}
                      onChange={(value) => setRating(value)}
                    />
                  </FormItem>
                </div>

                <DialogFooter className="mt-6">
                  <DialogClose asChild>
                    <Button variant="outline" className="cursor-pointer">
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="cursor-pointer"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        Opinando...
                        <Spinner className="ml-2 w-4 h-4 text-gray-500" />
                      </>
                    ) : (
                      "Enviar opinión"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
