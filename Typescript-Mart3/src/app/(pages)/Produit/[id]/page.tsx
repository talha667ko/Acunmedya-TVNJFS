"use client";
import { useEffect, useState } from "react";

interface ProductType {
    name: string;
    brand: string;
    price: number;
    description: string;
    color: string;
    imageURL: string;
}

export default function Page({ params }: { params: { _id: string } }) {
    const [product, setProduct] = useState<ProductType | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/details?id=${params._id}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error("Erreur lors du chargement du produit :", error);
            }
        };
        fetchProduct();
    }, [params._id]);

    if (!product) {
        return <div className="text-center p-4">Chargement...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <img src={product.imageURL} alt={product.name} className="w-64 h-64 object-contain mb-4" />
            <p><strong>Marque :</strong> {product.brand}</p>
            <p><strong>Couleur :</strong> {product.color}</p>
            <p><strong>Prix :</strong> {product.price} €</p>
            <p className="mt-4">{product.description}</p>
        </div>
    );
}
