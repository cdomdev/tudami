import { z } from "zod";
import { Control, UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/schemas";
import locationsData from "@/content/locations/locations.json";
import { useCallback } from "react";

import { SelectValue } from "@/components/ui/select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export function FormFieldLocation({
  control,
  setFilteredCities,
  filteredCities,
  form,
}: {
  control: Control<z.infer<typeof FormSchema>>;
  setFilteredCities: (cities: string[]) => void;
  filteredCities: string[];
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}) {


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
    [form, setFilteredCities]
  );



  return (
    <>
      <FormField
        control={control}
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
                    <SelectItem key={location.id} value={location.departamento}>
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

      <FormField
        control={form.control}
        name="city"
        render={({ field, fieldState }) => (
          <FormItem className="space-y-2">
            <FormLabel htmlFor="city-input" className="text-sm font-medium">
              Ciudad
            </FormLabel>
            <FormDescription className="text-sm text-muted-foreground">
              Especifica tu ciudad para una mejor ubicación geográfica.
            </FormDescription>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={
                  !form.watch("department") || filteredCities.length === 0
                }
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
              <FormMessage id="city-error" className="text-sm text-destructive">
                {fieldState.error.message}
              </FormMessage>
            )}
          </FormItem>
        )}
      />
    </>
  );
}
