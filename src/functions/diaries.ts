import dbConnect from "@/config/db";
import { PER_PAGE } from "@/constants";
import Diary from "@/models/diaryModel";

export async function getDiaries(page: number = 1, limit: number = PER_PAGE, query: string = "") {
    await dbConnect();

    const regex = new RegExp(`(${query})`, 'gi');

    const diaries = await Diary.find({ brief: { $regex: regex } }).limit(limit).skip(limit * (page - 1));
    const count = await Diary.countDocuments();

    return { data: diaries, count, status: 200 };
}