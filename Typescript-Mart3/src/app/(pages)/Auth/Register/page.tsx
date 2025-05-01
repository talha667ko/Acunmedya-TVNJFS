"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    firstName: z.string().min(2, { message: "Le prénom est requis" }).max(20, { message: "Le prénom ne doit pas dépasser 20 caractères" }),
    lastName: z.string().min(2, { message: "Le nom est requis" }).max(20, { message: "Le nom ne doit pas dépasser 20 caractères" }),
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }).max(20, { message: "Le mot de passe ne doit pas dépasser 20 caractères" }),
});

export default function Register() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Card className="flex flex-col justify-center items-center max-w-4xl w-full m-auto border-4 mt-32">
            <CardHeader className="max-w-xl w-full m-auto mb-6">
            <CardTitle className="text-4xl font-bold">Créer un Compte</CardTitle>
            <CardDescription className="">Inscrivez-vous pour profiter de nos services.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-1 mb-6 w-full m-auto justify-center items-center">
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button className="w-full">S'inscrire</Button>
                </form>
            </Form>
            </CardContent>
            <CardFooter className="flex flex-col max-w-3xl mt-3">
            <p className="text-center">Vous avez déjà un compte ? <Link href={"/Auth/Log-in"} className="text-blue-500 hover:underline">Se connecter</Link></p>
            <p className="text-center">En vous inscrivant, vous acceptez nos 
                <Link href={"/Account/Terms"} className="text-blue-500 hover:underline">Conditions d'utilisation</Link> et notre 
                <Link href={"/Account/Privacy"} className="text-blue-500 hover:underline">Politique de confidentialité</Link>.
            </p>
            </CardFooter>
        </Card>
    );
}
