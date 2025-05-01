
import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";


export async function POST(req:Request)
{
    await connectToDatabase();
    const {firstName,lastName,email,password} = await req.json();

    if(!firstName || !lastName || !email || !password)
    return new Response(JSON.stringify({message: "Missing required fields"}), {status: 400, headers: {"Content-Type": "application/json"}});

    const user = await User.create({firstName,lastName,email,password});

    return new Response(JSON.stringify(user), {status: 201, headers: {"Content-Type": "application/json"}});
}