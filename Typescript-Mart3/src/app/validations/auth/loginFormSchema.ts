import { z } from "zod";

export const loginFormSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }).max(20, { message: "Le mot de passe ne doit pas dépasser 20 caractères" }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;