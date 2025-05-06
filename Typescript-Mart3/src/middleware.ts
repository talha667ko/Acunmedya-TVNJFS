import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { composeMiddleware } from "@/lib/middleware/composeMiddleware";
import { authMiddleware } from "@/lib/middleware/authMiddleware";

//const PUBLIC_PATHS = ["/api/auth", "/Auth", ""];

export const middleware = composeMiddleware(
    authMiddleware,
);

export const config = {
    matcher: [
        "/Account/:path*",
    ]
  };