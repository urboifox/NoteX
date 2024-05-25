import { NextRequest, NextResponse } from "next/server";
import refreshAuth from "./lib/refreshAuth";
import { LOGGED_OUT_ROUTES } from "./constants";

export default async function middleware(req: NextRequest) {
    const session = req.cookies.get('session')?.value;
    
    if (!LOGGED_OUT_ROUTES.includes(req.nextUrl.pathname) && !session && req.nextUrl.pathname !== "/login") {
        const res = NextResponse.redirect(req.nextUrl.origin + "/login");
        return res;
    } else if (LOGGED_OUT_ROUTES.includes(req.nextUrl.pathname) && session) {
        const res = NextResponse.redirect(req.nextUrl.origin);
        return res;
    }

    return refreshAuth(session);
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}