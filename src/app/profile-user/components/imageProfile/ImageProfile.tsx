"use client";

import { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useController } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ImageProfile({
  control,
  avatar_url,
}: {
  control: any;
  avatar_url?: string;
}) {
  const { field, fieldState } = useController({
    name: "avatarFile",
    control,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  // si hay preview → usarlo, si no, mostrar avatar actual
  const imageSrc = preview || avatar_url;

  return (
    <FormField
      control={control}
      name="avatarFile"
      render={() => (
        <FormItem>
          <FormLabel className="text-sm font-medium">Foto de perfil</FormLabel>

          {imageSrc && (
            <div className="mt-2">
              <Image
                src={imageSrc}
                alt="Foto de perfil"
                className="w-20 h-20 rounded-full object-cover border"
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
              <label htmlFor="avatar-upload" className="cursor-pointer">
                Cambiar foto
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
