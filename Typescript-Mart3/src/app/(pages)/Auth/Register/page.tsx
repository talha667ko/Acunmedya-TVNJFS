import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Register() {
    return (
        <div className="flex flex-col justify-center items-center max-w-4xl w-full m-auto border-2 rounded-4xl mt-32 gap-1">
            <h1 className="text-4xl font-bold">Créer un Compte</h1>
            <p className="">Bienvenue sur notre site !</p>
            <input type="text" placeholder="Nom d'utilisateur" className="border-2 rounded-md p-2 mb-4" />
            <input type="email" placeholder="Email" className="border-2 rounded-md p-2 mb-4" />
            <input type="password" placeholder="Mot de passe" className="border-2 rounded-md p-2 mb-4" />
            <Button className="">S'inscrire</Button>
            <p className="text-center">Vous avez déjà un compte ? <Link href={"/Auth/Log-in"} className="text-blue-500">Se connecter</Link></p>
            <p className="text-center">En vous inscrivant, vous acceptez nos <Link href={"/Account/Terms"} className="text-blue-500">Conditions d'utilisation</Link> et notre <Link href={"/Account/Privacy"} className="text-blue-500">Politique de confidentialité</Link>.</p>
        </div>
    );
}