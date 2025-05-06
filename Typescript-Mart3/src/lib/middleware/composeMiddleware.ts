import { NextRequest, NextResponse } from "next/server";

export type MiddlewareFn = (req: NextRequest) => Promise<NextResponse | null>;

export function composeMiddleware(...middlewares: MiddlewareFn[]) {
    return async function (req: NextRequest) {
        for (const middleware of middlewares) {
          const result = await middleware(req);
          if (result) return result;
        }
        return NextResponse.next();
      };
}
    