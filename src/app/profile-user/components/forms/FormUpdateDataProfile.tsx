"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { memo, useCallback, useEffect } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/context/context.sesion";
import { updateProfile } from "../../lib/profile";

const FormSchema = z.object({
  phone: z
    .string()
    .min(10, "El número debe tener al menos 10 dígitos")
    .max(15, "El número no puede exceder 15 dígitos")
    .regex(/^[\d\s\+\-\(\)]+$/, "Formato de número inválido"),
  bio: z
    .string()
    .max(50, "La biografía no puede exceder 50 caracteres")
    .optional(),
});

export const FormUpdateDataProfile = memo(function FormUpdateDataProfile() {
  const { user, updateUserPreferences: updateUserPreferencesContext } = useSession();
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: user?.phone || "",
      bio: user?.bio || "",
    },
  });

  // Actualizar valores del formulario cuando cambie el usuario
  useEffect(() => {
    if (user) {
      form.reset({
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  }, [user, form]);

  const onSubmit = useCallback(async (data: z.infer<typeof FormSchema>) => {
    if (!user?.id) {
      toast.error("No se pudo identificar el usuario");
      return;
    }

    try {
      // Actualizar en la base de datos
      const { error } = await updateProfile(user.id, {
        phone: data.phone,
        bio: data.bio,
      });

      if (error) {
        toast.error("Error al guardar los datos personales");
        return;
      }

      // Actualizar el contexto
      updateUserPreferencesContext({
        phone: data.phone,
        bio: data.bio,
      });

      toast.success("Datos personales guardados correctamente");
    } catch (error) {
      console.error("Error al actualizar datos:", error);
      toast.error("Error al guardar los datos personales");
    }
  }, [user?.id, updateUserPreferencesContext]);

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="w-full space-y-6"
        noValidate
        aria-label="Formulario de datos personales"
      >
        <div>
          <h2 className="mb-2 text-lg font-medium" id="personal-data-heading">
            Datos personales
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            En esta sección puedes modificar datos adicionales que no son proporcionados 
            por tu proveedor de autenticación (Google, etc.). Esta información ayudará 
            a otros usuarios a conocerte mejor y contactarte.
          </p>
          <div className="space-y-4" role="group" aria-labelledby="personal-data-heading">
            {/* Número de teléfono */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="phone-input" className="text-sm font-medium">
                    Número de teléfono
                  </FormLabel>
                  <FormDescription className="text-sm text-muted-foreground">
                    Agregar tu número facilita que otros usuarios puedan contactarte 
                    directamente para colaboraciones, intercambio de conocimientos o 
                    oportunidades profesionales.
                  </FormDescription>
                  <FormControl>
                    <Input
                      id="phone-input"
                      type="tel"
                      placeholder="Ej: +57 123 456 7890"
                      {...field}
                      className="w-full"
                      aria-describedby={fieldState.error ? "phone-error" : "phone-description"}
                      aria-invalid={!!fieldState.error}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage id="phone-error" className="text-sm text-destructive">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Biografía del usuario */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel htmlFor="bio-input" className="text-sm font-medium">
                    Biografía
                  </FormLabel>
                  <FormDescription className="text-sm text-muted-foreground">
                    Una breve descripción sobre ti ayuda a otros usuarios a conocer 
                    tus intereses y experiencia. Máximo 50 caracteres.
                  </FormDescription>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        id="bio-input"
                        placeholder="Desarrollador apasionado por la tecnología..."
                        {...field}
                        rows={3}
                        maxLength={50}
                        className="w-full resize-none"
                        aria-describedby={fieldState.error ? "biografia-error" : "biografia-description"}
                        aria-invalid={!!fieldState.error}
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                        {field.value?.length || 0}/50
                      </div>
                    </div>
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage id="bio-error" className="text-sm text-destructive">
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full sm:w-auto"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Guardando..." : "Guardar datos"}
        </Button>
      </form>
    </Form>
  );
});
