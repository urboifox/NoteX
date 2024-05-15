'use server';

import dbConnect from "@/config/db";
import Diary from "@/models/diaryModel";

export async function createDiary(formData: FormData) {
    dbConnect();

    const title = formData.get('title');
    const description = formData.get('description');
    const content = formData.get('content');

    const diary = new Diary({ title, description, content });

    await diary.save();

    return {success: true, message: 'Diary created successfully'}
}