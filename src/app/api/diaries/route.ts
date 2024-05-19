import dbConnect from "@/config/db";
import Diary from "@/models/diaryModel";
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const diaryId = req.nextUrl.searchParams.get("diaryId");
    const authHeader = req.headers.get('Authorization');
    const session = authHeader?.split(' ')[1];

    if (!diaryId || !session) {
        return NextResponse.json({ data: null, message: "Not authorized" }, { status: 401 });
    }

    await dbConnect();

    const diaryFound = await Diary.findById(diaryId);
    if (!diaryFound) {
        return NextResponse.json({ data: null, message: "Session not found" }, { status: 404 });
    }

    const decoded = decodeJwt(session);
    const userId = decoded?.id;

    if (diaryFound.creatorId.toString() !== userId) {
        return NextResponse.json({ data: null, message: "Not authorized" }, { status: 401 });
    }

    await Diary.findByIdAndDelete(diaryId);

    return NextResponse.json({ data: null }, { status: 200 });
}