import z from "zod"

export const FormSchema = z.object({
    full_name: z
        .string()
        .min(2, "El nombre debe tener al menos un caracteres")
        .max(20, "El nombre no puede exeder los 20 cartacteres")
        .optional(),
    department: z
        .string()
        .max(100, "El departamento no puede exceder 100 caracteres").optional(),
    city: z
        .string()
        .max(100, "La ciudad no puede exceder 100 caracteres").optional(),
    phone: z
        .string()
        .refine((val) => {
            if (!val || val.trim() === "") return true;
            return val.length >= 10 && val.length <= 15;
        }, "El número debe tener entre 10 y 15 dígitos")
        .refine((val) => {
            if (!val || val.trim() === "") return true;
            return /^[\d\s\+\-\(\)]+$/.test(val);
        }, "Formato de número inválido")
        .optional(),
    bio: z
        .string()
        .max(500, "La biografía no puede exceder 500 caracteres")
        .optional(),
    avatarFile: z
        .any()
        .refine((file) => file instanceof File || file === undefined, {
            message: "Debe ser un archivo válido",
        })
        .optional(),
    avatar_url: z.string().optional(),

});