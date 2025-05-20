import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/handler/with-error-handler";
import { ConfigurationError, AuthenticationError } from "@/lib/handler/type/errorTypes";
import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !JWT_SECRET || !APP_URL) {
    throw new ConfigurationError("Required environment variables are not configured");
}

async function googleCallbackHandler(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code) {
        throw new AuthenticationError("No authorization code provided");
    }

    // Échanger le code contre un token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            code,
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: `${APP_URL}/api/auth/google/callback`,
            grant_type: "authorization_code",
        }),
    });

    if (!tokenResponse.ok) {
        throw new AuthenticationError("Failed to get access token");
    }

    const tokens = await tokenResponse.json();

    // Obtenir les informations de l'utilisateur
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
            Authorization: `Bearer ${tokens.access_token}`,
        },
    });

    if (!userResponse.ok) {
        throw new AuthenticationError("Failed to get user info");
    }

    const userData = await userResponse.json();

    await connectToDatabase();

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email: userData.email });

    if (!user) {
        // Créer un nouvel utilisateur
        user = await User.create({
            email: userData.email,
            firstName: userData.given_name,
            lastName: userData.family_name,
            password: Math.random().toString(36).slice(-8), // Mot de passe aléatoire
        });
    }

    // Créer le token JWT
    const token = await new SignJWT({ 
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(JWT_SECRET));

    // Définir le cookie
    const cookie = await cookies();
    cookie.set({
        name: "token",
        value: token,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    // Rediriger vers la page d'accueil
    return NextResponse.redirect(new URL("/", req.url));
}

export const GET = withErrorHandler(googleCallbackHandler); 