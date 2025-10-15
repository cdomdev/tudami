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

import { Spinner } from "@/components";
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

export function DialogOpinion() {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          <MessageCircle className="w-5 h-5 mr-2" />
          Opinar sobre Tudami
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
            <p className="text-sm text-gray-600">
              Valoramos tus comentarios. Nos ayudan a seguir mejorando Tudami
              para ti y para toda la comunidad.
            </p>
            <DialogClose asChild>
              <Button className="cursor-pointer">Volver a Tudami</Button>
            </DialogClose>
          </div>
        ) : !user ? (
          <div className="space-y-3">
            <p className="text-gray-600">
              Para enviar tu opinión sobre Tudami, necesitas iniciar sesión.
            </p>
            <Link href="/auth/login">
              <Button className="cursor-pointer w-full">Iniciar sesión</Button>
            </Link>
          </div>
        ) : (
          <>
            <Form {...form}>
              <div className="space-y-4 text-sm">
                <FormField
                  control={form.control}
                  name="opinion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opinión</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={4}
                          placeholder="Escribe tu opinión aquí..."
                        />
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
            </Form>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="button"
                onClick={handle}
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
