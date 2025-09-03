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
  email: z.string().email({ message: "Esta campo no puede quedar vacio" }),
  password: z.string().min(1, { message: "Este camo no puede quedar vacio" }),
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
      console.log("Res de la funcion para el contexto de usuario --->", res)
      setUser(res);
      const redirect = params.get("redirectTo") || "/";
      router.replace(redirect);
      setIsloading(false);
    } catch (error) {
      console.error("Error login:", error);
      toast.error(
        "Error: Algo salio mal al iniciar la sesion, intenta nuevamente"
      );
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
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Spinner className="w-5 h-5" />}
          {isLoading ? "Iniciando sesion..." : "Iniciar sesión"}
        </Button>
      </form>

      <div className="flex justify-end">
        <span>
          ¿No tienes cuenta?
          <Link
            href="/auth/register"
            className="font-semibold pl-2 hover:underline"
          >
            Regístrate
          </Link>
        </span>
      </div>
    </Form>
  );
}
