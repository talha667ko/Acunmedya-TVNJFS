import { connectToDatabase } from "@/lib/db/mongodb";
import { Product } from "@/lib/db/models/Product";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { _id: string } }) {
    await connectToDatabase();

    try {
        const product = await Product.findById(params._id);

        if (!product) {
            return new Response(JSON.stringify({ message: "Produit non trouvé" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Erreur interne", error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
