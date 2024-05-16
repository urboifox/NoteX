'use server';

import dbConnect from "@/config/db";
import Diary from "@/models/diaryModel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as zod from 'zod';
import * as jose from "jose";

const createDiarySchema = zod.object({
    brief: zod.string().min(10, "Brief must be at least 10 characters").max(100, "Brief must be at most 100 characters"),
})


type CreateDiaryType = {
    success: boolean;
    errors?: {
        brief?: string[],
    }
}

export async function createDiary(data: CreateDiaryType, formData: FormData): Promise<CreateDiaryType> {
    dbConnect();

    const brief = formData.get('brief');
    const content = formData.get('content');
    const session = cookies().get('session')?.value;

    if (!session) {
        redirect('/login');
    }

    const result = createDiarySchema.safeParse({ brief, content });

    if (result.success) {
        const decoded = jose.decodeJwt(session);
        const userId = decoded.id;

        const diary = new Diary({ brief, content, creatorId: userId });
        await diary.save();

        return { success: true }
    } else {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors
        }
    }
}