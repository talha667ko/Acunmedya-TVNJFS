"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormSchema, registerFormSchema } from "@/app/validations/auth/registerFormSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordRule {
    id: string;
    text: string;
    validate: (password: string) => boolean;
}

const passwordRules: PasswordRule[] = [
    {
        id: "length",
        text: "Au moins 8 caractères",
        validate: (password) => password.length >= 8
    },
    {
        id: "uppercase",
        text: "Au moins une lettre majuscule",
        validate: (password) => /[A-Z]/.test(password)
    },
    {
        id: "lowercase",
        text: "Au moins une lettre minuscule",
        validate: (password) => /[a-z]/.test(password)
    },
    {
        id: "number",
        text: "Au moins un chiffre",
        validate: (password) => /[0-9]/.test(password)
    },
    {
        id: "special",
        text: "Au moins un caractère spécial",
        validate: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }
];

export default function RegisterForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");

    const form = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false as any,
        },
    })

    async function onSubmit(values: RegisterFormSchema) {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Inscription réussie !");
                router.push(data.redirectTo);
            } else {
                toast.error(data.message || "Une erreur est survenue.");
            }
        } catch (error) {
            console.error("Erreur de connexion :", error);
            toast.error("Échec de l'inscription. Veuillez réessayer.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-3 mb-6 w-full m-auto justify-center items-center">
                    <div className="col-span-1">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="First Name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-1">
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Last Name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mot de passe</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input 
                                                type={showPassword ? "text" : "password"} 
                                                placeholder="Mot de passe" 
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setPassword(e.target.value);
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <div className="mt-2 space-y-1">
                                        {passwordRules.map((rule) => (
                                            <div
                                                key={rule.id}
                                                className={`text-sm flex items-center gap-2 ${
                                                    rule.validate(password)
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                <div className={`w-2 h-2 rounded-full ${
                                                    rule.validate(password)
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`} />
                                               {rule.text}
                                            </div>
                                        ))}
                                    </div>
                                    
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-2">
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmez mot de passe</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input 
                                                type={showConfirmPassword ? "text" : "password"} 
                                                placeholder="Confirmez le mot de passe" 
                                                {...field} 
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2"
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-2 flex flex-col">
                        <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormLabel className="text-sm">J'accepte les termes et conditions</FormLabel>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit" className="w-full">S'inscrire</Button>
            </form>
        </Form>
    )
}