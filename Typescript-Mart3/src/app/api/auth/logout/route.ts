
import { connectToDatabase } from "@/lib/db/mongodb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(req:NextRequest)
{
    await connectToDatabase();

    const cookieDeletion = await cookies();
    cookieDeletion.delete("token");

    return NextResponse.json(
        { message: "Logged out successfully", redirectTo: "/Auth/Log-in" },
        { status: 200 }
      );
}