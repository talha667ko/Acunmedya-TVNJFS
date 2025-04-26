// HTTP Request Anatomy araştırılacak.

import { Product } from "../../../lib/db/models/Product";
import { connectToDatabase } from "@/lib/db/mongodb";

export async function GET() {
  await connectToDatabase();

  const products = await Product.find();

  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  await connectToDatabase();
  const body = await req.json();
  const addedProduct = await Product.create(body);

  return new Response(JSON.stringify(addedProduct), {
    headers: { "Content-Type": "application/json" },
  });
}

// 1- RDBMS - NOSQL (PostgreSQL - MongoDB)
// Prisma - Mongoose
