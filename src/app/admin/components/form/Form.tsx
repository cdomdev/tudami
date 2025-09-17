
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

import { UploadImage } from "./UploadImage"
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
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components";
import { toast } from "sonner";
import { FormSchemaResources, SchemaResources } from "@/schemas"
import { saveResource, uploadImage } from "../../lib"

export function FormNewResounce() {
    const [isLoading, setIsloading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchemaResources>>({
        resolver: zodResolver(FormSchemaResources),
        defaultValues: {
            title: "",
            description: "",
            image: "",
            category: "",
            detail_title: "",
            detail_desciption: "",
            url: "",
        },
    });



    const categoriesNames = [
        {
            slug: "cursos",
            name: "Cursos"
        },
        {
            slug: "documentation",
            name: "Documentacion"
        },
        {
            slug: "herramientas",
            name: "Herramientas"
        },
        {
            slug: "videos",
            name: "Videos"
        }
    ]


    async function onSubmit(data: SchemaResources) {
        setIsloading(true);

        try {
            let imageResource;
            if (data.image instanceof File) {
                const res = await uploadImage(data.image, data.category.toLowerCase());
                imageResource = res?.url;
            }

            // formatear datos para la tabla 
            const formattedData = {
                title: data.title,
                description: data.description,
                image: imageResource,
                category: data.category,
                url: data.url,
                detail_title: data.detail_title,
                detail_desciption: data.detail_desciption,
            };

            const res = await saveResource(formattedData)
            if (res) toast.success("Recurso agregado con exito")

            form.reset({
                title: "",
                description: "",
                image: "",
                category: "",
                detail_title: "",
                detail_desciption: "",
                url: "",
            })

        } catch (error) {
            console.error("Error add resourse:", error);
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
                {/* titulo */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titulo para el nuevo recurso</FormLabel>
                            <FormControl>
                                <Input placeholder="Academia dev" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* descripcion */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Descripcion
                            </FormLabel>
                            <FormControl>

                                <Textarea {...field} rows={4} placeholder="Descripcion del recurso" />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* url  */}
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Url del recurso</FormLabel>
                            <FormControl>
                                <Input placeholder="https://recurso.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* categoria */}

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Seleccionar la categoria del recurso
                            </FormLabel>
                            <FormControl>

                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                    }}
                                >
                                    <SelectTrigger className="bg-white/70 text-black dark:text-muted-foreground">
                                        <SelectValue placeholder="Selecciona un categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoriesNames.map((cat) => (
                                            <SelectItem key={cat.slug} value={cat.slug}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                {/* image */}
                <UploadImage control={form.control} />


                {/* detalles */}


                <FormField
                    control={form.control}
                    name="detail_title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titulo para el detalle de el nuevo  recuso</FormLabel>
                            <FormControl>
                                <Input placeholder="¿Que es un curso?" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="detail_desciption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Describe un poco el recurso que se esta agregando
                            </FormLabel>
                            <FormControl>

                                <Textarea {...field} rows={4} placeholder="Descripcion del detalle" />

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
                    {isLoading ? "Guardando..." : "Guardar"}
                </Button>
            </form>
        </Form>
    );
}
