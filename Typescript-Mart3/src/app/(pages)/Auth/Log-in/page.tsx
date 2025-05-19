import LoginForm from "@/app/_components/Auth/LoginForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
export default function Login() {
    
    return (
        <Card className="flex flex-col justify-center items-center max-w-4xl w-full m-auto border-4 mt-16">
            <CardHeader className="max-w-xl w-full m-auto mb-6">
                <CardTitle className="text-4xl font-bold">Connexion</CardTitle>
                <CardDescription className="">Bienvenue sur notre site !</CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter>
            <p className="text-center">Vous n'avez pas de compte ? 
                <Link href={"/Auth/Register"} className="text-blue-500 hover:underline">Créer un compte</Link>
            </p>
            </CardFooter>
        </Card>
    );
}