import { z } from "zod";

const passwordSchema = z.string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une lettre majuscule" })
    .regex(/[a-z]/, { message: "Le mot de passe doit contenir au moins une lettre minuscule" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Le mot de passe doit contenir au moins un caractère spécial" });

export const registerFormSchema = z.object({
    firstName: z.string().min(2, { message: "Le prénom est requis" }).max(20, { message: "Le prénom ne doit pas dépasser 20 caractères" }),
    lastName: z.string().min(2, { message: "Le nom est requis" }).max(20, { message: "Le nom ne doit pas dépasser 20 caractères" }),
    email: z.string().email({ message: "Email invalide" }),
    password: passwordSchema,
    confirmPassword: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
    terms: z.literal(true, {
        errorMap: () => ({ message: "Vous devez accepter les termes et conditions" }),
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;