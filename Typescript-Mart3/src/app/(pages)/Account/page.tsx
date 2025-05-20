"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { getUserLastNameAsync, getUserNameAsync } from "@/lib/jwtClient";
import { CircleHelp, Heart, Package, PackageOpen, PackageX, Settings, ShoppingCart, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Account() {

    const [userFirstName, setUserFirstName] = useState<string | null>(null);
    const [userLastName, setUserLastName] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserName = async () => {
            const name = await getUserNameAsync();
            const lastName = await getUserLastNameAsync();
            setUserFirstName(name);
            setUserLastName(lastName);
        };
        fetchUserName();
    }, []);
   
    async function logOut() {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();

                if(res.ok)
                    router.push(data.redirectTo);
                else
                    alert(data.message || "Une erreur est survenue.");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    }
    
    return (
        <>
            <Card className="flex flex-col justify-center items-center max-w-5xl w-full m-auto gap-2 border-3 rounded-4xl mt-12 p-12">
                <CardTitle className="text-4xl mb-6" >Mon Compte</CardTitle>
                <p className="text-lg mb-4">Bienvenue sur votre compte {userFirstName} {userLastName} !</p>
                <div className="grid grid-cols-3 gap-x-3 gap-y-6 mb-6 w-3/4">
                    <Card className="col-span-3 p-6 justify-center items-center text-lg font-medium hover:shadow-xl transition-all duration-300"><UserCircle size={40}/> Informations</Card>
                    <Card className="col-span-1 p-6 justify-center items-center text-center text-lg font-medium hover:shadow-xl transition-all duration-300"><ShoppingCart size={40}/>Mon Panier</Card>
                    <Card className="col-span-1 p-6 justify-center items-center text-center text-lg font-medium hover:shadow-xl transition-all duration-300"><Heart size={40}/>Mes Favoris</Card>
                    <Card className="col-span-1 p-6 justify-center items-center text-center text-lg font-medium hover:shadow-xl transition-all duration-300"><Package size={40}/>Commandes</Card>
                    <Card className="col-span-1 p-6 justify-center items-center text-center text-lg font-medium hover:shadow-xl transition-all duration-300"><PackageOpen size={40}/>Mes Achats</Card>
                    <Card className="col-span-1 p-6 justify-center items-center text-center text-lg font-medium hover:shadow-xl transition-all duration-300"><PackageX size={40}/>Mes Retours</Card>
                    <Card className="col-span-1 p-6 justify-center items-center text-center text-lg font-medium hover:shadow-xl transition-all duration-300"><CircleHelp size={40}/>Aide</Card>
                    <Card className="col-span-3 p-6 justify-center items-center text-center text-lg font-medium hover:shadow-xl transition-all duration-300"><Settings size={40}/>Réglages comptes</Card>

                </div>
                <Button onClick={logOut} className="mt-6 w-2/3 bg-red-700 hover:bg-red-400">Déconnexion</Button>
            </Card>
        </>
    );
}