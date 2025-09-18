"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, useController } from "react-hook-form";
import { z } from "zod";
import { FormSchemaResources } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface FormSchemaType {
  control: Control<z.infer<typeof FormSchemaResources>>;
  url_image?: string
}

export function UploadImage({ control, url_image }: FormSchemaType) {
  const [preview, setPreview] = useState<string | null>(null);
  const { field, fieldState } = useController({
    name: "image",
    control,
  });

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }

  const imageSrc = preview || url_image ;

  return (
    <FormField
      control={control}
      name="image"
      render={() => (
        <FormItem>
          <FormLabel className="text-sm font-medium">
            Imagen para el recurso
          </FormLabel>

          {imageSrc && (
            <div className="mt-2">
              <Image
                src={imageSrc}
                alt="Imagen de recursos"
                className="w-40 h-40 rounded-sm object-cover border"
                width={80}
                height={80}
              />
            </div>
          )}
          <FormControl>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="avatar-upload"
            />
          </FormControl>

          <div className="mt-2">
            <Button type="button" variant="outline" size="sm" asChild>
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer flex items-center gap-x-2"
              >
                <Upload className="w-4 h-4" />
                Seleccionar imagen
              </label>
            </Button>
          </div>

          {fieldState.error && (
            <FormMessage className="text-sm text-destructive">
              {fieldState.error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}
