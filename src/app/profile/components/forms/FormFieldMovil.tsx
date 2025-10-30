import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { z } from "zod";
import { FormSchema } from "@/schemas";

export function FormFieldMovil({
  control,
}: {
  control: Control<z.infer<typeof FormSchema>>;
}) {
  return (
    <FormField
      control={control}
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
              className="w-full bg-white/70 text-black dark:text-muted-foreground"
              aria-describedby={
                fieldState.error ? "phone-error" : "phone-description"
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
