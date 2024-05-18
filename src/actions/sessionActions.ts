'use server'

import dbConnect from "@/config/db"
import Session from "@/models/sessionModel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as jose from "jose";
import { revalidatePath } from "next/cache";

type SaveSessionType = {
    success: boolean;
    error?: string;
}

export async function saveSession(data: SaveSessionType, formData: FormData): Promise<SaveSessionType> {
    await dbConnect();

    const authSession = cookies().get('session')?.value;

    if (!authSession) {
        redirect('/login');
    }

    const decoded = jose.decodeJwt(authSession);
    const userId = decoded?.id;
    
    if (!userId) {
        return { success: false, error: 'Not authenticated' }
    }

    const newSession = await Session.create({
        time: formData.get('time'),
        sessionName: formData.get('sessionName'),
        creatorId: userId
    });

    await newSession.save();

    revalidatePath('/session/list')

    return { success: true }
}

