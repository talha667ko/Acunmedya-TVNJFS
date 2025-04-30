"use client";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";


export default function CardCom(){

    interface CardData {
        name: string;
        brand: string;
        color: string;
        description: string;
        price: number;
        imageURL: string;
    }

    const [cardData, setCardData] = useState<CardData[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const cachedData = localStorage.getItem("cardData");
          if (cachedData) {
            console.log("Utilisation des données en cache (localStorage)");
            setCardData(JSON.parse(cachedData));
            return;
          }
    
          console.log("Fetching depuis l'API");
          const response = await fetch("/api/products");
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
          }
          const data = await response.json();
          localStorage.setItem("cardData", JSON.stringify(data)); // Stockez dans localStorage
          setCardData(data);
        } catch (error) {
          console.error("Erreur :", error);
        }
      };
    
      fetchData();
    }, []);

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 md:p-0 px-3  gap-4 max-w-4xl w-full m-auto">
                {cardData.map((card, index) => (
                    <Card key={index} className="w-full h-100 max-w-xs overflow-hidden transition-all duration-300 hover:shadow-2xl">
                        <div className="relative overflow-hidden h-1/2">
                            <img src={card.imageURL} alt={card.name} className="w-full h-full object-contain"/>
                        </div>
                        <div className="p-4 h-1/2">
                            <h2 className="text-xl font-bold">{card.name}</h2>
                            <p className="text-xl text-black font-bold">{card.price} €</p>
                            <p className="text-sm text-cyan-700">{card.brand}</p>
                            <p className="text-sm text-cyan-700">{card.color}</p>
                            <p className="text-sm text-gray-500 overflow-hidden">{card.description}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    )
}