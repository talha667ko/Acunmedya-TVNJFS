import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import RegisterForm from "@/app/_components/Auth/RegisterForm";

export default function Register() {
    return (
        <Card className="flex flex-col justify-center items-center max-w-4xl w-full m-auto border-4 mt-12">
            <CardHeader className="max-w-xl w-full m-auto mb-6">
            <CardTitle className="text-4xl font-bold">Créer un Compte</CardTitle>
            <CardDescription className="">Inscrivez-vous pour profiter de nos services.</CardDescription>
            </CardHeader>
            <CardContent>
            <RegisterForm />
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
