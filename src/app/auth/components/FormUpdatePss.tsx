"use client";
import { supabase } from "@/utils/supabase/supabaseClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
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
import { Spinner } from "@/components";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import { updatePassword } from "../lib/auth";
export const FormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
      .regex(/[A-Z]/, { message: "Debe incluir al menos una mayúscula" })
      .regex(/[0-9]/, { message: "Debe incluir al menos un número" }),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Las contraseñas no coinciden",
    path: ["password2"],
  });

export function FormUpdate() {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code");
  const email = params.get("email") || "";

  useEffect(() => {
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
        if (error) console.error(error);
        else console.log("Sesion creada:", data.session);
      });
    }
  }, [code]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      password2: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsloading(true);
    try {
      await updatePassword(data.password, email);
      router.push(
        `/auth/update-password/result?success=true&message=${encodeURIComponent(
          "contraseña actualizada con exito"
        )}`
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error desconocido";
      console.error("Error en la solicitud:", message);
      toast.error("No pudimos procesar tu solicitud. Intenta más tarde.");
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-1 items-center justify-between">
                <FormLabel>Nueva contraseña</FormLabel>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nueva contraseña"
                    className="bg-white"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-sm text-gray-500"
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5 cursor-pointer" />
                    ) : (
                      <EyeClosed className="w-5 h-5 cursor-pointer" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-1 items-center justify-between">
                <FormLabel>Nueva contraseña</FormLabel>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Confirmar contraseña"
                    {...field}
                    className="bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword2(!showPassword2)}
                    className="absolute right-3 top-2 text-sm text-gray-500"
                  >
                    {showPassword2 ? (
                      <Eye className="w-5 h-5 cursor-pointer" />
                    ) : (
                      <EyeClosed className="w-5 h-5 cursor-pointer" />
                    )}
                  </button>
                </div>
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
    </Form>
  );
}
