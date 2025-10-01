import { Control } from "react-hook-form";
import { FormSchemaNews } from "@/schemas";
import { SimpleEditor } from "@/components/ui/editor/simple/simple-editor";
import { z } from "zod";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

interface FieldControl {
  control: Control<z.infer<typeof FormSchemaNews>>;
}

export function FieldDescription({ control }: FieldControl) {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">
            Descripción de la noticia
          </FormLabel>
          <FormControl>
            <SimpleEditor
              onChange={field.onChange} 
              isAmd={true}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
