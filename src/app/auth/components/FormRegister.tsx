"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Spinner } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { registerUser } from "../lib/auth";
import { toast } from "sonner";


const FormSchema = z.object({
  email: z.string().email({ message: "Debe ser un correo válido." }),
  name: z.string().min(2).max(100),
  password: z.string()
    .min(8, { message: "Debe tener mínimo 8 caracteres" })
    .regex(/[a-z]/, { message: "Debe incluir una letra minúscula" })
    .regex(/[A-Z]/, { message: "Debe incluir una letra mayúscula" })
    .regex(/[0-9]/, { message: "Debe incluir un número" })
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/, { message: "Debe incluir un carácter especial" }),
});

const nameNotAllowed = ["admin", "administrator", "root", "superuser", "supervisor", "system", "guest", "user", "test", "null", "undefined", "operator", "manager", "owner", "support", "contact", "info", "webmaster", "security", "administrator1", "admin123", "Tudami", "tudami", "TUDAMI",];

export function FormRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      if(nameNotAllowed.includes(data.name)){
        toast.error("Este nombre no está permitido, por favor elige otro.");
        return;
      }

      const res = await registerUser({
        full_name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success(res.data.message);

      form.reset({
        name: "",
        email: "",
        password: "",
      });

      const redirect = params.get("redirectTo") || "login/";
      router.replace(redirect);
    } catch (err: unknown) {
      const message = (err as Error).message ?? "Error inesperado";
      toast.error(`Error: ${message}`);
    }
    finally{
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                    disabled={isLoading}
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

        <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner className="w-5 h-5" />
              <span>Registrando...</span>
            </>
          ) : (
            "Registrarme"
          )}
        </Button>
      </form>

      <div className="flex justify-end">
        <span>
          ¿Ya tienes cuenta?
          <Link
            href="/auth/login"
            className="font-semibold pl-2 underline"
          >
            Inicia sesión
          </Link>
        </span>
      </div>
    </Form>
  );
}
