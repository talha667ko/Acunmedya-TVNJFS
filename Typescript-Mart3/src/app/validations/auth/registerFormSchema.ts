import { z } from "zod";

export const registerFormSchema = z.object({
    firstName: z.string().min(2, { message: "Le prénom est requis" }).max(20, { message: "Le prénom ne doit pas dépasser 20 caractères" }),
    lastName: z.string().min(2, { message: "Le nom est requis" }).max(20, { message: "Le nom ne doit pas dépasser 20 caractères" }),
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }).max(20, { message: "Le mot de passe ne doit pas dépasser 20 caractères" }),
    confirmPassword: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }).max(20, { message: "Le mot de passe ne doit pas dépasser 20 caractères" }),
    terms: z.literal(true),
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;