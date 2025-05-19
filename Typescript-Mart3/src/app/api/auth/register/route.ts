
import { registerFormSchema } from "@/app/validations/auth/registerFormSchema";
import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest)
{
    await connectToDatabase();
    
    const body = await req.json();
    const result = registerFormSchema.safeParse(body);

    if(!result.success)
      return NextResponse.json(
        { message: "Invalid data", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );

    const user = await User.create({firstName:result.data.firstName,lastName:result.data.lastName,email:result.data.email,password:result.data.password});

    return NextResponse.json(
        { message: "Registered to successfully", redirectTo: "/Auth/Log-in" },
        { status: 200 }
      );
}