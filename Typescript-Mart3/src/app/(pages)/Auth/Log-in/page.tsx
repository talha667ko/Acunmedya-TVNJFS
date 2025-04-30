"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }).max(20, { message: "Le mot de passe ne doit pas dépasser 20 caractères" }),
});
export default function Login() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
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
        <Card className="flex flex-col justify-center items-center max-w-4xl w-full m-auto border-4 mt-32 gap-1">
            <CardHeader className="w-full m-auto">
                <CardTitle className="text-4xl font-bold">Connexion</CardTitle>
                <CardDescription className="text-lg">Bienvenue sur notre site !</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex flex-col gap-1 mb-6 w-full m-auto justify-center items-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="w-full">
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
                        <div className="">
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
                <Button className="w-full">Se Connecter</Button>
                </form>
                </Form>
                </div>
                <p className="text-center">Vous n'avez pas de compte ? <Link href={"/Auth/Register"} className="text-blue-500">Créer un compte</Link></p>

            </CardContent>
        </Card>
    );
}