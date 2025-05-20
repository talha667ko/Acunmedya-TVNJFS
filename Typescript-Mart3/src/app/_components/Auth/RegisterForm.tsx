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

    async function handleGoogleLogin() {
        try {
            const res = await fetch("/api/auth/google", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isSignUp: true }),
            });
            
            if (res.ok) {
                const data = await res.json();
                window.location.href = data.url;
            } else {
                toast.error("Erreur lors de l'inscription avec Google");
            }
        } catch (error) {
            console.error("Erreur Google :", error);
            toast.error("Échec de l'inscription avec Google");
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
                <Button type="submit" className="w-full mb-4">S'inscrire</Button>
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="text-sm text-gray-500">ou</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={handleGoogleLogin}
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    S'inscrire avec Google
                </Button>
            </form>
        </Form>
    )
}