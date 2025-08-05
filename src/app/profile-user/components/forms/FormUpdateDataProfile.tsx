"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { memo, useCallback, useEffect, useState } from "react";
import locationsData from "@/content/locations/locations.json";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const FormSchema = z.object({
  department: z
    .string()
    .min(2, "El departamento debe tener al menos 2 caracteres")
    .max(100, "El departamento no puede exceder 100 caracteres"),
  city: z
    .string()
    .min(2, "La ciudad debe tener al menos 2 caracteres")
    .max(100, "La ciudad no puede exceder 100 caracteres"),
  phone: z
    .string()
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      return val.length >= 10 && val.length <= 15;
    }, "El número debe tener entre 10 y 15 dígitos")
    .refine((val) => {
      if (!val || val.trim() === "") return true;
      return /^[\d\s\+\-\(\)]+$/.test(val);
    }, "Formato de número inválido")
    .optional(),
  bio: z
    .string()
    .max(500, "La biografía no puede exceder 500 caracteres")
    .optional(),
});

export const FormUpdateDataProfile = memo(function FormUpdateDataProfile() {
  const { user, updateUserData } =
    useSession();



  // Estado para las ciudades filtradas
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      department: user?.department ? String(user.department) : "",
      city: user?.city ? String(user.city) : "",
      phone: user?.phone ? String(user.phone) : "",
      bio: user?.bio ? String(user.bio) : "",
    },
  });

  // Función para actualizar ciudades cuando cambia el departamento
  const handleDepartmentChange = useCallback((departmentName: string) => {

    const selectedDepartment = locationsData.find(
      (location) => location.departamento === departmentName
    );

    if (selectedDepartment) {
      setFilteredCities(selectedDepartment.ciudades);
    } else {
      setFilteredCities([]);
    }

    // Solo limpiar la ciudad seleccionada si no está entre las opciones válidas
    const currentCity = form.getValues("city");
    if (currentCity && selectedDepartment && !selectedDepartment.ciudades.includes(currentCity)) {
      form.setValue("city", "");
    }
  }, [form]);

  // Actualizar valores del formulario cuando cambie el usuario
  useEffect(() => {
    if (user) {

      const formData = {
        phone: user.phone ? String(user.phone) : "",
        bio: user.bio ? String(user.bio) : "",
        city: user.city ? String(user.city) : "",
        department: user.department ? String(user.department) : "",
      };

      form.reset(formData);

      // Si el usuario tiene un departamento, cargar sus ciudades
      if (user.department) {
        handleDepartmentChange(String(user.department));
      }
    }
  }, [user, form, handleDepartmentChange]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof FormSchema>) => {
      if (!user?.id) {
        toast.error("No se pudo identificar el usuario");
        return;
      }

      try {
        // Asegurar que todos los valores sean strings
        const formattedData = {
          phone: data.phone ? Number(data.phone) :undefined ,
          bio: data.bio ? String(data.bio) : "",
          department: data.department ? String(data.department) : "",
          city: data.city ? String(data.city) : "",
        };

        // Actualizar en la base de datos
        const { error } = await updateProfile(user.id, formattedData);

        if (error) {
          toast.error("Error al guardar los datos personales");
          return;
        }

        // Actualizar el contexto
        updateUserData(formattedData);


        toast.success("Datos personales guardados correctamente");
      } catch (error) {
        console.error("Error al actualizar datos:", error);
        toast.error("Error al guardar los datos personales");
      }
    },
    [user?.id,  updateUserData]
  );

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
            En esta sección puedes modificar datos adicionales que no son
            proporcionados por tu proveedor de autenticación (Google, etc.).
            Esta información ayudará a otros usuarios a conocerte mejor y
            contactarte.
          </p>
          <div
            className="space-y-4"
            role="group"
            aria-labelledby="personal-data-heading"
          >
            {/* Número de teléfono */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel
                    htmlFor="phone-input"
                    className="text-sm font-medium"
                  >
                    Número de teléfono
                  </FormLabel>
                  <FormDescription className="text-sm text-muted-foreground">
                    Agregar tu número facilita que otros usuarios puedan
                    contactarte directamente para colaboraciones, intercambio de
                    conocimientos o oportunidades profesionales.
                  </FormDescription>
                  <FormControl>
                    <Input
                      id="phone-input"
                      type="tel"
                      placeholder="Ej: +57 123 456 7890"
                      {...field}
                      className="w-full bg-white/70 text-black dark:text-muted-foreground"
                      aria-describedby={
                        fieldState.error ? "phone-error" : "phone-description"
                      }
                      aria-invalid={!!fieldState.error}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage
                      id="phone-error"
                      className="text-sm text-destructive"
                    >
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            {/* Departamento */}
            <FormField
              control={form.control}
              name="department"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel
                    htmlFor="department-input"
                    className="text-sm font-medium"
                  >
                    Departamento
                  </FormLabel>
                  <FormDescription className="text-sm text-muted-foreground">
                    Agregar tu departamento facilita que otros usuarios puedan
                    conocerte mejor y encontrar personas en tu área geográfica.
                  </FormDescription>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleDepartmentChange(value);
                      }}
                    >
                      <SelectTrigger className="bg-white/70 text-black dark:text-muted-foreground">
                        <SelectValue placeholder="Selecciona un departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {locationsData.map((location) => (
                          <SelectItem
                            key={location.id}
                            value={location.departamento}
                          >
                            {location.departamento}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage
                      id="department-error"
                      className="text-sm text-destructive"
                    >
                      {fieldState.error.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />

            {/* Ciudad */}
            <FormField
              control={form.control}
              name="city"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel
                    htmlFor="city-input"
                    className="text-sm font-medium"
                  >
                    Ciudad
                  </FormLabel>
                  <FormDescription className="text-sm text-muted-foreground">
                    Especifica tu ciudad para una mejor ubicación geográfica.
                  </FormDescription>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!form.watch("department") || filteredCities.length === 0}
                    >
                      <SelectTrigger className="bg-white/70 text-black dark:text-muted-foreground">
                        <SelectValue
                          placeholder={
                            !form.watch("department")
                              ? "Primero selecciona un departamento"
                              : "Selecciona una ciudad"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage
                      id="city-error"
                      className="text-sm text-destructive"
                    >
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
                  <FormLabel
                    htmlFor="bio-input"
                    className="text-sm font-medium"
                  >
                    Biografía
                  </FormLabel>
                  <FormDescription className="text-sm text-muted-foreground">
                    Una breve descripción sobre ti ayuda a otros usuarios a
                    conocer tus intereses y experiencia. Máximo 50 caracteres.
                  </FormDescription>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        id="bio-input"
                        placeholder="Desarrollador apasionado por la tecnología..."
                        {...field}
                        rows={3}
                        maxLength={50}
                        className="w-full resize-none bg-white/70 text-black dark:text-muted-foreground"
                        aria-describedby={
                          fieldState.error
                            ? "biografia-error"
                            : "biografia-description"
                        }
                        aria-invalid={!!fieldState.error}
                      />
                      <div className="absolute bottom-2 right-2 text-xs text-black dark:text-muted-foreground">
                        {field.value?.length || 0}/50
                      </div>
                    </div>
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage
                      id="bio-error"
                      className="text-sm text-destructive"
                    >
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
