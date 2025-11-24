
import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Ingrese un email válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(20, { message: "La contraseña debe tener menos de 20 caracteres" }),
  remember_me: z.boolean()
});

// Inferir el tipo directamente desde el esquema
export type LoginFormData = z.infer<typeof LoginFormSchema>;
