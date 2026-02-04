"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { memo, useCallback, useEffect, useState } from "react";
import locationsData from "@/content/locations/locations.json";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FormSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import { useSession } from "@/context/context.sesion";
import { updateProfile, uploadImage } from "../../lib/profile";
import { ImageProfile } from "./ImageProfile";
import { FormFieldName } from "./FormFieldName";
import { FormFieldMovil } from "./FormFieldMovil";
import { FormFieldLocation } from "./FormFieldLocation";
import { FormFieldBio } from "./FormFieldBio";

export const FormUpdateDataProfile = memo(function FormUpdateDataProfile() {
  const { user, updateUserData } = useSession();
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      full_name: user?.full_name ? String(user.full_name) : "",
      department: user?.department ? String(user.department) : "",
      city: user?.city ? String(user.city) : "",
      phone: user?.phone ? String(user.phone) : "",
      bio: user?.bio ? String(user.bio) : "",
      avatarFile: undefined,
      avatar_url: user?.avatar_url ? String(user.avatar_url) : "",
    },
  });

  // Función para actualizar ciudades cuando cambia el departamento
  const handleDepartmentChange = useCallback(
    (departmentName: string) => {
      const selectedDepartment = locationsData.find(
        (location) => location.departamento === departmentName
      );

      if (selectedDepartment) {
        setFilteredCities(selectedDepartment.ciudades);
      } else {
        setFilteredCities([]);
      }

      const currentCity = form.getValues("city");
      if (
        currentCity &&
        selectedDepartment &&
        !selectedDepartment.ciudades.includes(currentCity)
      ) {
        form.setValue("city", "");
      }
    },
    [form]
  );

  useEffect(() => {
    if (user) {
      const formData = {
        full_name: user.full_name ? String(user.full_name) : "",
        phone: user.phone ? String(user.phone) : "",
        bio: user.bio ? String(user.bio) : "",
        city: user.city ? String(user.city) : "",
        department: user.department ? String(user.department) : "",
        avatarFile: undefined,
        avatar_url: user.avatar_url ? String(user.avatar_url) : "",
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
        let avatarUrl = user?.avatar_url;
        if (data.avatarFile instanceof File) {
          const res = await uploadImage(data.avatarFile, user.id);
          avatarUrl = res?.url;
        }

        const formattedData = {
          full_name: data.full_name ?? "",
          phone: data.phone ? Number(data.phone) : undefined,
          bio: data.bio ?? "",
          department: data.department ?? "",
          city: data.city ?? "",
          avatar_url: avatarUrl ?? "",
        };

        const { error } = await updateProfile(user.id, formattedData);

        if (error) {
          toast.error("Error al guardar los datos personales");
          return;
        }

        updateUserData(formattedData);

        toast.success("Datos personales guardados correctamente");
      } catch (error) {
        console.error("Error al actualizar datos:", error);
        toast.error("Error al guardar los datos personales");
      }
    },
    [user?.id, updateUserData, user?.avatar_url]
  );

  const textLoading = form.formState.isSubmitting
    ? "Actualizando"
    : "Actualizar datos";

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
            En esta sección puedes modificar datos personales. Esta información
            ayudará a otros usuarios a conocerte mejor y contactarte.
          </p>
          <div
            className="space-y-4"
            role="group"
            aria-labelledby="personal-data-heading"
          >
            {/* image profile */}

            <ImageProfile
              avatar_url={user?.avatar_url}
              control={form.control}
            />

            {/* personalizar nombre */}

            <FormFieldName control={form.control} />

            {/* Número de teléfono */}
            <FormFieldMovil control={form.control} />

            {/* Departamento */}
            <FormFieldLocation
              control={form.control}
              filteredCities={filteredCities}
              setFilteredCities={setFilteredCities}
              form={form}
            />

            {/* Biografía del usuario */}
            <FormFieldBio control={form.control} />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full sm:w-auto cursor-pointer"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <Spinner className="w-5 h-5" />}
          {textLoading}
        </Button>
      </form>
    </Form>
  );
});
