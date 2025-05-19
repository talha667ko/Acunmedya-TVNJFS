import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";
import { SignJWT} from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { loginFormSchema, LoginFormSchema } from "@/app/validations/auth/loginFormSchema";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function POST(req:Request)
{
    await connectToDatabase();
    const body = await req.json();
    const result = loginFormSchema.safeParse(body);

    if(!result.success)
      return NextResponse.json(
        { message: "Invalid data", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );

    const {email,password} = result.data;
    const user = await User.findOne({email})
    if(!user)
       return new Response(JSON.stringify({message: "Invalid credentials"}), {status: 400, headers: {"Content-Type": "application/json"}});

    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid)
       return new Response(JSON.stringify({message: "Invalid credentials"}), {status: 400, headers: {"Content-Type": "application/json"}});

    const token = await new SignJWT({userId: user._id})
         .setProtectedHeader({alg: 'HS256'})
         .setIssuedAt()
         .setExpirationTime('2h')
         .sign(new TextEncoder().encode(JWT_SECRET));

      const cookie = await cookies();

      cookie.set(
      {
         name: "token",
         value: token,
         httpOnly:true,
         maxAge:  7 * 24 * 60 * 60,
         path: '/',
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'lax'
      }
      );


      return NextResponse.json(
         { message: "Login successful", redirectTo: "/" },
         { status: 200 }
       );

}