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
import { useState } from "react";
import Link from "next/link";
import { sendRequestForgotPassword } from "../lib/auth";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email({ message: "Ingrese un correo valido" }),
});

export function FormForgot() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsloading(true);
    try {
      await sendRequestForgotPassword(data.email);
      router.replace("/auth/forgot-password/success");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No púdimos procesar tu solicitud.";
      toast.error(`Error: ${message}`);
    } finally {
      setIsloading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 mb-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  placeholder="usuario@ejemplo.com"
                  {...field}
                  className="bg-white"
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
          {isLoading ? "Enviando ..." : "Enviar informacion"}
        </Button>
      </form>

      <div className="flex justify-center ">
        <span>
          ¿Ya tienes cuenta?
          <Link href="/auth/login" className="font-semibold underline pl-2">
            Iniciar sesion
          </Link>
        </span>
      </div>
    </Form>
  );
}
