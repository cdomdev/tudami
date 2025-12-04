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
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { loginWithPassword } from "../lib/auth";
import { Spinner } from "@/components";
import { toast } from "sonner";
import { useSession } from "@/context/context.sesion";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
  email: z
    .string()
    .min(2, { message: "El correo es obligatorio" })
    .email({ message: "Debe ser un correo válido" }),
  password: z.string().min(1, { message: "La contraseña es obligatoria" }),
});

export function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const router = useRouter();
  const params = useSearchParams();
  const { setUser } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsloading(true);
    try {
      const res = await loginWithPassword(data.email, data.password);
      setUser(res);
      const redirectTo = params.get("redirectTo") || "/";
      router.push(redirectTo);
    } catch (error) {
      console.error("Error login:", error);
      toast.error(
        `Error: ${error instanceof Error ? error.message : "Error desconocido"}`
      );
    } finally {
      setIsloading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="usuario@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-1 items-center justify-between">
                <FormLabel htmlFor="contraseña">Contraseña</FormLabel>
                <FormLabel>
                  <Link href="/auth/forgot-password" className="underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </FormLabel>
              </div>
              <FormControl>
                <div className="relative">
                  <Input
                    id="contraseña"
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
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

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading && <Spinner className="w-5 h-5" />}
          {isLoading ? "Iniciando sesion..." : "Iniciar sesión"}
        </Button>
      </form>

      <div className="flex justify-end">
        <span>
          ¿No tienes cuenta?
          <Link href="/auth/register" className="font-semibold pl-2 underline">
            Regístrate
          </Link>
        </span>
      </div>
    </Form>
  );
}
