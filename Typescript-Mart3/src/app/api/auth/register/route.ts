
import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest)
{
    await connectToDatabase();
    const {firstName,lastName,email,password} = await req.json();

    if(!firstName || !lastName || !email || !password)
    return new Response(JSON.stringify({message: "Missing required fields"}), {status: 400, headers: {"Content-Type": "application/json"}});

    const user = await User.create({firstName,lastName,email,password});

    return NextResponse.json(
        { message: "Registered to successfully", redirectTo: "/Auth/Log-in" },
        { status: 200 }
      );
}