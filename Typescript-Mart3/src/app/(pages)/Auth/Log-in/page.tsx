import Link from "next/link";

export default function Login() {
    return (
        <div className="flex flex-col justify-center items-center max-w-4xl w-full m-auto border-2 rounded-4xl mt-32 gap-1">
                <h1 className="text-4xl font-bold">Connexion</h1>
                <p className="">Bienvenue sur notre site !</p>
                <input type="text" placeholder="Nom d'utilisateur" className="border-2 rounded-md p-2 mb-4"/>
                <input type="password" placeholder="Mot de passe" className="border-2 rounded-md p-2 mb-4"/>
                <button className="bg-blue-500 text-white rounded-md p-2 mb-4">Se Connecter</button>
                <p className="text-center">Vous n'avez pas de compte ? <Link href={"/Account/Register"} className="text-blue-500">Créer un compte</Link></p>
            </div>
        
    );
}