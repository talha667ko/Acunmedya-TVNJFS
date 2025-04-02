import { Card } from "@/components/ui/card";
import fairt from "../../../public/Fairtex.jpg"

export default function CardCom(){

    const cardData = [
        {
            title: "Gants de boxe",
            brand: "Élion Paris",
            color: "Turquoise",
            description: "Gants de boxe en cuir de vachette, fabriqués en Thaïlande.",
            img: "/ELEGANT.jpg",
            price: 200
        },
        {
            title: "Gants de MMA",
            brand: "Venum",
            color: "Noir/doré",
            description: "Gants de MMA en cuir de buffle, fabriqués en Thaïlande.",
            img: "/gantsMMA.jpg",
            price: 25
        },
        {
            title: "Protèges tibia",
            brand: "Fairtex",
            color: "Noir",
            description: "Protèges tibia en cuir de buffle, fabriqués en Thaïlande.",
            img: "/Fairtex.jpg",
            price: 100
        },
        {
            title: "Sac de sport",
            brand: "Reebok",
            color: "Camouflage",
            description: "Sac de sport en polyester, fabriqué en Chine.",
            img: "/sac.jpg",
            price: 30
        },
        {
            title: "Sac de sport",
            brand: "Reebok",
            color: "Camouflage",
            description: "Sac de sport en polyester, fabriqué en Chine.",
            img: "/sac.jpg",
            price: 30
        },
        {
            title: "Sac de sport",
            brand: "Reebok",
            color: "Camouflage",
            description: "Sac de sport en polyester, fabriqué en Chine.",
            img: "/sac.jpg",
            price: 30
        },
        {
            title: "Sac de sport",
            brand: "Reebok",
            color: "Camouflage",
            description: "Sac de sport en polyester, fabriqué en Chine.",
            img: "/sac.jpg",
            price: 30
        },
        {
            title: "Sac de sport",
            brand: "Reebok",
            color: "Camouflage",
            description: "Sac de sport en polyester, fabriqué en Chine.",
            img: "/sac.jpg",
            price: 30
        }
    ]

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {cardData.map((card, index) => (
                    <Card key={index} className="w-full h-100 max-w-xs overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <div className="relative overflow-hidden">
                            <img src={card.img} alt={card.title} className="w-full h-full object-contain"/>
                        </div>
                        <div className="p-4">
                            <h2 className="text-3xl font-bold">{card.title}</h2>
                            <p className="text-sm text-gray-500">{card.brand}</p>
                            <p className="text-sm text-gray-500">{card.color}</p>
                            <p className="text-sm text-gray-500">{card.description}</p>
                            <p className="text-xl text-black font-bold">{card.price} €</p>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    )
}