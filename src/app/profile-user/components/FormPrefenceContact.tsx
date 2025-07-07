
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"

const FormSchema = z.object({
    allow_email: z.boolean(),
    allow_whatsapp: z.boolean(),
});

export function FormPrefenceContact() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            allow_email: false,
            allow_whatsapp: false,
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log("Preferencias enviadas:", data);
        toast("Preferencias guardadas");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div>
                    <h3 className="mb-4 text-lg font-medium">Medios de contacto</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Decide si quieres que otros usuarios puedan contactarte por alguno de estos medios.
                    </p>
                    <div className="space-y-4">
                        {/* Contacto por Correo */}
                        <FormField
                            control={form.control}
                            name="allow_email"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Correo electrónico</FormLabel>
                                        <FormDescription>
                                            Permite que otros usuarios te contacten a través de tu correo electrónico.
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

                <Button type="submit">Guardar preferencias</Button>
            </form>
        </Form>

    )
}
