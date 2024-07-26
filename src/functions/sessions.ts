import dbConnect from "@/config/db";
import Session from "@/models/sessionModel";
import * as jose from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSessions(page: number = 1, limit: number = 8): Promise<DataResponse<SessionResponse[]>> {
    await dbConnect();
    const authSession = cookies().get("session")?.value;

    if (!authSession) {
        redirect("/login");
    }

    const validSession = jose.jwtVerify(authSession, new TextEncoder().encode(process.env.JWT_SECRET!));
    
    if (!validSession) {
        return {
            data: [],
            count: 0,
            status: 401
        }
    }

    const decoded = jose.decodeJwt(authSession);
    const userId = decoded?.id;

    const count = await Session.countDocuments({ creatorId: userId });
    const sessions = await Session.find({ creatorId: userId }).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit);
    return { data: sessions, count: count, status: 200 };
}