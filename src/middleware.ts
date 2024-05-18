import { NextRequest, NextResponse } from "next/server";
import refreshAuth from "./lib/refreshAuth";
import { PUBLIC_ROUTES } from "./constants";

export default async function middleware(req: NextRequest) {
    const session = req.cookies.get('session')?.value;
    
    if (!PUBLIC_ROUTES.includes(req.nextUrl.pathname) && !session) {
        const res = NextResponse.redirect(req.nextUrl.origin + "/login");
        return res;
    } else if (PUBLIC_ROUTES.includes(req.nextUrl.pathname) && session) {
        const res = NextResponse.redirect(req.nextUrl.origin);
        return res;
    }

    return refreshAuth(session);
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}