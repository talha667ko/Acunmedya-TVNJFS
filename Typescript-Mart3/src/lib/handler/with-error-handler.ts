import { NextRequest, NextResponse } from "next/server";
import { 
    AuthorizationError, 
    AuthenticationError,
    BusinessError, 
    ValidationError,
    NotFoundError,
    ConfigurationError,
    DatabaseError 
} from "./type/errorTypes";

export function withErrorHandler(
    handler: (req:NextRequest) => Promise<NextResponse>
) {
    return async (req:NextRequest) => {
        try {
            return await handler(req);
        } catch (error:any) {
            console.error("Error caught in withErrorHandler:", error);

            if (error instanceof ValidationError) {
                return NextResponse.json(
                    { message: error.message },
                    { status: 400 }
                );
            }
            
            if (error instanceof BusinessError) {
                return NextResponse.json(
                    { message: error.message },
                    { status: 400 }
                );
            }

            if (error instanceof AuthenticationError) {
                return NextResponse.json(
                    { message: error.message },
                    { status: 401 }
                );
            }

            if (error instanceof AuthorizationError) {
                return NextResponse.json(
                    { message: "Unauthorized" },
                    { status: 403 }
                );
            }

            if (error instanceof NotFoundError) {
                return NextResponse.json(
                    { message: error.message },
                    { status: 404 }
                );
            }

            if (error instanceof ConfigurationError) {
                return NextResponse.json(
                    { message: "Configuration error" },
                    { status: 500 }
                );
            }

            if (error instanceof DatabaseError) {
                return NextResponse.json(
                    { message: "Database error" },
                    { status: 500 }
                );
            }
            

            // Erreur inconnue
            return NextResponse.json(
                { message: "Une erreur inattendue s'est produite" },
                { status: 500 }
            );
        }
    }
}