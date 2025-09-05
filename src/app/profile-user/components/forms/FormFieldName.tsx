import { Control } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "@/schemas";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function FormFieldName({
  control,
}: {
  control: Control<z.infer<typeof FormSchema>>;
}) {
  return (
    <FormField
      control={control}
      name="full_name"
      render={({ field, fieldState }) => (
        <FormItem className="space-y-2">
          <FormLabel htmlFor="full_name-input" className="text-sm font-medium">
            Nombre
          </FormLabel>
          <FormDescription className="text-sm text-muted-foreground">
            Por defecto usamos el nombre dado por tu proveedor, pero eres libre
            de persolizarlo en este campo.
          </FormDescription>
          <FormControl>
            <Input
              id="full_name-input"
              type="text"
              placeholder="Ej: Juan Pérez"
              {...field}
              className="w-full bg-white/70 text-black dark:text-muted-foreground"
              aria-describedby={
                fieldState.error ? "full_name-error" : "full_name-description"
              }
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
  );
}
