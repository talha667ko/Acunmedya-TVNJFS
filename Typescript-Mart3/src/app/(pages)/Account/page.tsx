import Link from "next/link";

export default function Account() {

    // Simulate user authentication status
    const isLoggedIn = false; // Change this to false to simulate a logged-out state
    // In a real application, you would check the user's authentication status here
    // For example, you might check a cookie or a session variable
    // const isLoggedIn = checkUserAuthentication();
    
    return (
        <>
            <div className="flex flex-col justify-center items-center max-w-4xl w-full m-auto border-2 rounded-4xl mt-32">
                <h1 className="text-4xl font-bold">Mon Compte</h1>
                <p className="">Bienvenue sur votre compte !</p>
                <p className="text-center">Vous pouvez gérer vos informations personnelles et vos commandes ici.</p>
                <Link href={"/Account/Orders"} className="text-center">Mes Commandes</Link>
                <Link href={"/Account/Settings"} className="text-center">Paramètres du Compte</Link>
                <Link href={"/Account/Logout"} className="text-center">Déconnexion</Link>
            </div>
        </>
    );
}