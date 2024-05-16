import dbConnect from "@/config/db";
import Diary from "@/models/diaryModel";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();

    // const diaries = await Diary.find();

    return NextResponse.json({ status: 200, data: [] });
}

