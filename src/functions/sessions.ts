import dbConnect from "@/config/db";
import Session from "@/models/sessionModel";
import * as jose from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSessions() {
    await dbConnect();
    const authSession = cookies().get("session")?.value;

    if (!authSession) {
        redirect("/login");
    }

    const decoded = jose.decodeJwt(authSession);
    const userId = decoded?.id;

    const sessions = await Session.find({ creatorId: userId });
    return sessions;
}

