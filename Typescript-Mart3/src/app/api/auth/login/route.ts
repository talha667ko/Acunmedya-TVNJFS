import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";
import { SignJWT} from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { loginFormSchema, LoginFormSchema } from "@/app/validations/auth/loginFormSchema";
import { withErrorHandler } from "@/lib/handler/with-error-handler";
import { ValidationError, AuthenticationError, ConfigurationError } from "@/lib/handler/type/errorTypes";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new ConfigurationError("JWT_SECRET is not defined");
}

async function loginHandler(req: Request) {
    await connectToDatabase();
    const body = await req.json();
    const result = loginFormSchema.safeParse(body);

    if (!result.success) {
        throw new ValidationError("Invalid login data");
    }

    const { email, password } = result.data;
    const user = await User.findOne({ email });

    if (!user) {
        throw new AuthenticationError("Invalid credentials");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new AuthenticationError("Invalid credentials");
    }

    const token = await new SignJWT({ email: user.email, firstName: user.firstName, lastName: user.lastName })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(JWT_SECRET));

    const cookie = await cookies();
    cookie.set({
        name: "token",
        value: token,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });

    return NextResponse.json(
        { message: "Login successful", redirectTo: "/" },
        { status: 200 }
    );
}

export const POST = withErrorHandler(loginHandler);