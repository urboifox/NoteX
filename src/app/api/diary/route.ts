import dbConnect from "@/config/db";
import Diary from "@/models/diaryModel";

export async function GET() {
    dbConnect();

    const diaries = await Diary.find();

    return Response.json({ status: 200, data: diaries });
}

