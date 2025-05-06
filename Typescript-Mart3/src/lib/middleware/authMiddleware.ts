import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function authMiddleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value!;
    const secret = process.env.JWT_SECRET;
    const secret_key = new TextEncoder().encode(secret);

    try {
        await jwtVerify(token, secret_key);
    } catch (err) {
        return NextResponse.redirect(new URL("/Auth/Log-in", request.url));
    }
    return null;
}