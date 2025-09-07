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
import { sendCodeForgotPassword } from "../lib/auth";
import { Spinner } from "@/components";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const FormSchema = z.object({
    email: z.string().email({ message: "Esta campo no puede quedar vacio" }),
});

export function FormForgot() {
    const [isLoading, setIsloading] = useState<boolean>(false);
    const router = useRouter();
    const params = useSearchParams();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsloading(true);
        try {
            const res = await sendCodeForgotPassword(data.email);
            console.log(res)
            const redirect = params.get("redirectTo") || "/";
            router.replace(redirect);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mb-6">
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



                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isLoading}
                >
                    {isLoading && <Spinner className="w-5 h-5" />}
                    {isLoading ? "Enviando ..." : "Enviar codigo de reinicio"}
                </Button>
            </form>

            <div className="flex justify-center ">
                <span>
                    ¿Ya tienes cuenta?
                    <Link
                        href="/auth/login"
                        className="font-semibold underline pl-2"
                    >
                        Iniciar sesion
                    </Link>
                </span>
            </div>
        </Form>
    );
}
