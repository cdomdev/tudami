import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useSession } from "@/context/context.sesion";
import { updateUserPreferences } from "../../lib/profile";
import { Spinner } from "@/components/Spiner";

const FormSchema = z.object({
  public_profile: z.boolean().optional(),
  allow_email: z.boolean(),
  allow_whatsapp: z.boolean(),
});

export function FormPrefenceContact() {
  const [loading, setLoading] = useState(false);
  const { user, updateUserPreferences: updateUserPreferencesContext } =
    useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      public_profile: user?.user_profile_preferences.profile_public ?? false,
      allow_email: user?.user_profile_preferences.allow_email ?? false,
      allow_whatsapp: user?.user_profile_preferences.allow_whatsapp ?? false,
    },
  });

  // Actualizar valores del formulario cuando cambie el usuario
  useEffect(() => {
    if (user) {
      form.reset({
        public_profile: user.user_profile_preferences.profile_public ?? false,
        allow_email: user.user_profile_preferences.allow_email ?? false,
        allow_whatsapp: user.user_profile_preferences.allow_whatsapp ?? false,
      });
    }
  }, [user, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    if (!user?.id) {
      toast.error("No se pudo identificar el usuario");
      return;
    }

    try {
      // Actualizar en la base de datos
      const { error, data:resUp } = await updateUserPreferences(user.id, {
        profile_public: data.public_profile,
        allow_email: data.allow_email,
        allow_whatsapp: data.allow_whatsapp,
      });


      if (error) {
        toast.error("Error al guardar las preferencias");
        setLoading(false);
        return;
      }

      // Actualizar el contexto
      updateUserPreferencesContext({
        profile_public: resUp.public_profile,
        allow_email: resUp.allow_email,
        allow_whatsapp: resUp.allow_whatsapp,
      });

      toast.success("Preferencias guardadas correctamente");
      setLoading(false);
    } catch (error) {
      console.error("Error al actualizar preferencias:", error);
      toast.error("Error al guardar las preferencias");
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Medios de contacto</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Decide si quieres que otros usuarios puedan contactarte por alguno
            de estos medios o visitar tu perfil.
          </p>
          <div className="space-y-4">
            {/* Perfil público */}
            <FormField
              control={form.control}
              name="public_profile"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Perfil público</FormLabel>
                    <FormDescription>
                      Permite que otros vean tu perfil - por defecto su perfil
                      esta marcado como público. <strong>puedes cambiarlo eso cuando quieras</strong>
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="cursor-pointer"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Contacto por Correo */}
            <FormField
              control={form.control}
              name="allow_email"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormDescription>
                      Permite que otros usuarios te contacten a través de tu
                      correo electrónico.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="cursor-pointer"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Contacto por WhatsApp */}
            <FormField
              control={form.control}
              name="allow_whatsapp"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>WhatsApp</FormLabel>
                    <FormDescription>
                      Permite que otros usuarios te contacten por WhatsApp.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="cursor-pointer"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner className="w-4 h-4" />
              Guardando...
            </>
          ) : (
            "Guardar preferencias"
          )}
        </Button>
      </form>
    </Form>
  );
}
