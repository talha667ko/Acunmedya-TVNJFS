"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }).max(20, { message: "Le mot de passe ne doit pas dépasser 20 caractères" }),
});
export default function Login() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await fetch("/api/auth/login", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            const data = await res.json();
      
            if (res.ok) {
              router.push(data.redirectTo);
            } else {
              alert(data.message || "Une erreur est survenue.");
            }
          } catch (error) {
            console.error("Erreur de connexion :", error);
            alert("Échec de la connexion. Veuillez réessayer.");
          }
    }
    return (
        <Card className="flex flex-col justify-center items-center max-w-4xl w-full m-auto border-4 mt-16">
            <CardHeader className="max-w-xl w-full m-auto mb-6">
                <CardTitle className="text-4xl font-bold">Connexion</CardTitle>
                <CardDescription className="">Bienvenue sur notre site !</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-rows-2 grid-cols-2 gap-1 gap-y-3 mb-6 w-full justify-center items-center">
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
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="col-span-1">Se Connecter</Button>
                </div>
                </form>
                </Form>
            </CardContent>
            <CardFooter>
            <p className="text-center">Vous n'avez pas de compte ? 
                <Link href={"/Auth/Register"} className="text-blue-500 hover:underline">Créer un compte</Link>
            </p>
            </CardFooter>
        </Card>
    );
}