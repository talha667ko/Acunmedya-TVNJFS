import { registerFormSchema } from "@/app/validations/auth/registerFormSchema";
import { User } from "@/lib/db/models/User";
import { connectToDatabase } from "@/lib/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/lib/handler/with-error-handler";
import { ValidationError, BusinessError, DatabaseError } from "@/lib/handler/type/errorTypes";
import { userBusinessRules } from "@/lib/rules/userBusinessRules";

async function registerHandler(req: NextRequest) {
    await connectToDatabase();
    
    const body = await req.json();
    const result = registerFormSchema.safeParse(body);

    if (!result.success) {
        throw new ValidationError("Invalid registration data");
    }

    try {
        await userBusinessRules.checkEmailUniqueness(result.data.email);
        
        const user = await User.create({
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            email: result.data.email,
            password: result.data.password
        });

        return NextResponse.json(
            { message: "Registered successfully", redirectTo: "/Auth/Log-in" },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof BusinessError) {
            throw error;
        }
        throw new DatabaseError("Failed to create user");
    }
}

export const POST = withErrorHandler(registerHandler);