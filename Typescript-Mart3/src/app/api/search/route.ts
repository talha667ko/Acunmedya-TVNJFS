import { Product } from "../../../lib/db/models/Product";
import { connectToDatabase } from "@/lib/db/mongodb";

export async function GET(req: Request) {
    await connectToDatabase();

    const url = new URL(req.url);
    const searchQuery = url.searchParams.get("query") || "";

    if (!searchQuery) {
        return new Response(JSON.stringify([]), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }

    const products = await Product.find({
        name: { $regex: searchQuery, $options: "i" }
    }).exec();

    return new Response(JSON.stringify(products), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}
