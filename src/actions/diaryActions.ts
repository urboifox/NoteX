'use server';

import dbConnect from "@/config/db";
import Diary from "@/models/diaryModel";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as zod from 'zod';
import * as jose from "jose";
import { revalidatePath } from "next/cache";

const createDiarySchema = zod.object({
    brief: zod.string().min(3, "Brief must be at least 10 characters").max(100, "Brief must be at most 100 characters"),
})


type DiaryFormType = {
    success: boolean;
    errors?: {
        brief?: string[],
    }
}

export async function createDiary(data: DiaryFormType, formData: FormData): Promise<DiaryFormType> {
    await dbConnect();

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

        revalidatePath('/diary');

        return { success: true }
    } else {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors
        }
    }
}

export async function updateDiary(data: DiaryFormType, formData: FormData): Promise<DiaryFormType> {
    await dbConnect();

    const brief = formData.get("brief");
    const content = formData.get("content");
    const diaryId = formData.get("diaryId");
    const session = cookies().get("session")?.value;

    if (!session) {
        redirect("/login");
    }

    const result = createDiarySchema.safeParse({ brief, content });

    if (result.success) {

        const diary = await Diary.findById(diaryId);

        if (!diary) {
            redirect("/diary");
        }

        diary.brief = brief;
        diary.content = content;

        await diary.save();

        revalidatePath(`/diary/${diaryId}`);

        return { success: true };
    }

    return {
        success: false,
        errors: result.error.flatten().fieldErrors,
    };
}