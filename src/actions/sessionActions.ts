'use server'

import dbConnect from "@/config/db"
import Session from "@/models/sessionModel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jose from "jose";
import { revalidatePath } from "next/cache";

type SessionType = {
    success: boolean;
    error?: string;
}

export async function saveSession(data: SessionType, formData: FormData): Promise<SessionType> {
    await dbConnect();

    const authSession = cookies().get('session')?.value;

    if (!authSession) {
        redirect('/login');
    }

    const valid = jose.jwtVerify(authSession, new TextEncoder().encode(process.env.JWT_SECRET!));
    
    if (!valid) {
        return {
            success: false,
            error: 'Not authenticated'
        };
    }

    const decoded = jose.decodeJwt(authSession);
    const userId = decoded?.id;
    
    if (!userId) {
        return { success: false, error: 'Not authenticated' }
    }

    const newSession = await Session.create({
        time: formData.get('time'),
        sessionName: formData.get('sessionName') || "Anonymous",
        creatorId: userId
    });

    await newSession.save();

    revalidatePath('/session/list');

    return { success: true }
}