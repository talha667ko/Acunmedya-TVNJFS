import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

//const PUBLIC_PATHS = ["/api/auth", "/Auth", ""];

export async function middleware(request: NextRequest) {
    console.log("Middleware triggered");
    console.log(request.nextUrl.pathname);
    /*if(PUBLIC_PATHS.some(path => request.nextUrl.pathname.startsWith(path))){
        return NextResponse.next();
    }*/

    const token = request.cookies.get("token")?.value!;
    const secret = process.env.JWT_SECRET;
    const secret_key = new TextEncoder().encode(secret);

    try{
        await jwtVerify(token, secret_key);
    }catch(err){
        return NextResponse.redirect(new URL("/Auth/Log-in", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/Account",
    ]
  };