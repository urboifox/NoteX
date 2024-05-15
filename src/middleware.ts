import { NextRequest } from "next/server";
import refreshAuth from "./lib/refreshAuth";

export default async function middleware(req: NextRequest) {
    return await refreshAuth(req);
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}