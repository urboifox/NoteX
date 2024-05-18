import dbConnect from "@/config/db";
import { PER_PAGE } from "@/constants";
import Diary from "@/models/diaryModel";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function getDiaries(page: number = 1, limit: number = PER_PAGE, query: string = "") {
    await dbConnect();

    const session = cookies().get('session')?.value;
    
    if (!session) {
        return { data: [], count: 0, status: 401 };
    }

    const decoded = jose.decodeJwt(session);
    const userId = decoded.id;

    const regex = new RegExp(`(${query})`, 'gi');

    const diaries = await Diary.find({ brief: { $regex: regex }, creatorId: userId }).limit(limit).skip(limit * (page - 1));
    const count = await Diary.countDocuments({ creatorId: userId });

    return { data: diaries, count, status: 200 };
}

export async function getDiaryById(diaryId: string): Promise<DiaryResponse | null> {
    await dbConnect();

    const diary = await Diary.findById(diaryId);

    if (!diary) {
        return null;
    }

    return diary;
}

