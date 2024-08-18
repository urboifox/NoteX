import { NextResponse } from "next/server";
import * as jose from "jose";

export default async function refreshAuth(oldSession: string|undefined) {
    if (!oldSession) return;

    const decoded = jose.decodeJwt(oldSession);
    const userId = decoded?.id;
    
    const validSession = jose.jwtVerify(oldSession, new TextEncoder().encode(process.env.JWT_SECRET!));

    if (!validSession) return;

    const session = await new jose.SignJWT({ id: userId })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime('12h')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET!))

    const res = NextResponse.next();
    res.cookies.set('session', session, { path: '/', httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 });
    res.headers.set('Authorization', `Bearer ${session}`);

    return res;
}
