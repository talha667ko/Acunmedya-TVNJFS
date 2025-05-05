import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";
import {jwtVerify, SignJWT} from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req:Request)
{
    await connectToDatabase();
    const {email,password} = await req.json();

    if(!email || !password)
       return new Response(JSON.stringify({message: "Missing required fields"}), {status: 400, headers: {"Content-Type": "application/json"}});
    const user = await User.findOne({email})

    if(!user)
       return new Response(JSON.stringify({message: "Invalid credentials"}), {status: 400, headers: {"Content-Type": "application/json"}});

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid)
       return new Response(JSON.stringify({message: "Invalid credentials"}), {status: 400, headers: {"Content-Type": "application/json"}});

    const token = await new SignJWT({userId: user._id})
         .setProtectedHeader({alg: 'HS256'})
         .setIssuedAt()
         .setExpirationTime('2h')
         .sign(new TextEncoder().encode(JWT_SECRET));


    return new Response(JSON.stringify({message: "Login successful"}), {status: 200, headers: {"Content-Type": "application/json"}});
}