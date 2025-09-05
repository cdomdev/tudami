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
import { Textarea } from "@/components/ui/textarea";

export function FormFieldBio({
  control,
}: {
  control: Control<z.infer<typeof FormSchema>>;
}) {
  return (
    <FormField
      control={control}
      name="bio"
      render={({ field, fieldState }) => (
        <FormItem className="space-y-2">
          <FormLabel htmlFor="bio-input" className="text-sm font-medium">
            Biografía
          </FormLabel>
          <FormDescription className="text-sm text-muted-foreground">
            Una breve descripción sobre ti ayuda a otros usuarios a conocer tus
            intereses y experiencia. Máximo 50 caracteres.
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
                  fieldState.error ? "biografia-error" : "biografia-description"
                }
                aria-invalid={!!fieldState.error}
              />
              <div className="absolute bottom-2 right-2 text-xs text-black dark:text-muted-foreground">
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
  );
}
