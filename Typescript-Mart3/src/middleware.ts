import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/api/auth", "api/public"];

export async function middleware(request: NextRequest) {
    if(PUBLIC_PATHS.some(path => request.nextUrl.pathname.startsWith(path)))
        return NextResponse.next();

    const token = request.cookies.get("token")?.value!;
    const secret = process.env.JWT_SECRET;
    const secret_key = new TextEncoder().encode(secret);

    try{
        await jwtVerify(token, secret_key);
    }catch(err){
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }
    return NextResponse.next();
}