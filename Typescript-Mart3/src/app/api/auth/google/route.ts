import { NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/handler/with-error-handler";
import { ConfigurationError } from "@/lib/handler/type/errorTypes";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !APP_URL) {
    throw new ConfigurationError("Google OAuth credentials or APP_URL are not configured");
}

const REDIRECT_URI = `${APP_URL}/api/auth/google/callback`;

async function googleAuthHandler() {
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    authUrl.searchParams.append("client_id", GOOGLE_CLIENT_ID);
    authUrl.searchParams.append("redirect_uri", REDIRECT_URI);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("scope", "email profile");
    authUrl.searchParams.append("access_type", "offline");
    authUrl.searchParams.append("prompt", "consent");

    return NextResponse.json({ url: authUrl.toString() });
}

export const GET = withErrorHandler(googleAuthHandler); 