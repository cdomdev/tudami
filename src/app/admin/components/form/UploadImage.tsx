"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Control, useController, Path } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useId, useRef, useState, useEffect } from "react";
import Image from "next/image";


interface UploadImageProps<T extends { image?: File | string | undefined }> {
  control: Control<T>;
  url_image?: string;
}

export function UploadImage<T extends { image?: File | string | undefined }>(
  { control, url_image }: UploadImageProps<T>
) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { field, fieldState } = useController({
    name: "image" as Path<T>,
    control,
  });

  async function handleFile(file?: File | null) {
    if (!file) return;
    field.onChange(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) await handleFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await handleFile(file);
  }

  function clearFile() {
    // Aceptamos que el valor pueda ser File | string | undefined
    field.onChange(undefined as unknown as File | string | undefined);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const imageSrc = preview || url_image;

  // field.value puede ser File (cuando el usuario seleccionó un archivo) o string (cuando viene una URL)
  const selectedFile = field.value && typeof field.value !== "string" ? (field.value as File) : undefined;

  return (
    <FormField
      control={control}
      name={"image" as Path<T>}
      render={() => (
        <FormItem>
          <FormLabel className="text-sm font-medium">
            Imagen para el recurso
          </FormLabel>

          <div
            className={`mt-2 rounded-md border-2 p-3 flex flex-col md:flex-row items-center gap-4 transition-colors ${
              isDragging ? "border-dashed border-blue-500 bg-blue-50/30" : "border-dashed border-gray-200"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            aria-label="Upload image dropzone"
          >
            <FormControl>
              <input
                ref={inputRef}
                id={`avatar-upload-${id}`}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </FormControl>

            <div className="flex-1 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="flex-1 min-w-0">
                <label
                  htmlFor={`avatar-upload-${id}`}
                  className="cursor-pointer text-sm font-medium text-foreground"
                >
                  {imageSrc ? "Cambiar imagen o arrastrar y soltar aquí" : "Arrastra una imagen aquí o haz clic para seleccionar"}
                </label>

                {imageSrc && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-24 h-24 rounded-sm overflow-hidden border">
                      <Image
                        src={imageSrc}
                        alt="Imagen de recursos"
                        className="object-cover"
                        width={96}
                        height={96}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm line-clamp-1">{selectedFile?.name ?? "Imagen seleccionada"}</span>
                      <span className="text-xs text-muted-foreground">{selectedFile?.size ? `${Math.round(selectedFile.size / 1024)} KB` : null}</span>
                    </div>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="ml-auto p-1 rounded-md text-destructive hover:bg-destructive/10"
                      aria-label="Eliminar imagen seleccionada"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {!imageSrc && (
              <div className="mt-2 md:mt-0">
                <Button type="button" variant="outline" size="sm" asChild>
                  <label
                    htmlFor={`avatar-upload-${id}`}
                    className="cursor-pointer flex items-center gap-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    Seleccionar imagen
                  </label>
                </Button>
              </div>
            )}
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
