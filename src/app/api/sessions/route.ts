import dbConnect from "@/config/db";
import Session from "@/models/sessionModel";
import { decodeJwt } from "jose";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const sessionId = req.nextUrl.searchParams.get("sessionId");
    const authHeader = req.headers.get('Authorization');
    const session = authHeader?.split(' ')[1];

    if (!sessionId || !session) {
        return NextResponse.json({ data: null, message: "Not authorized" }, { status: 401 });
    }

    await dbConnect();

    const sessionFound = await Session.findById(sessionId);
    if (!sessionFound) {
        return NextResponse.json({ data: null, message: "Session not found" }, { status: 404 });
    }

    const decoded = decodeJwt(session);
    const userId = decoded?.id;

    if (sessionFound.creatorId.toString() !== userId) {
        return NextResponse.json({ data: null, message: "Not authorized" }, { status: 401 });
    }

    await Session.findByIdAndDelete(sessionId);

    revalidatePath("/session/list");

    return NextResponse.json({ data: null }, { status: 200 });
}