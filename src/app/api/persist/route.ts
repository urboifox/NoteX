import dbConnect from "@/config/db";
import Board from "@/models/boardModel";
import { decodeJwt, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { snapshot } = await req.json();

    if (!snapshot) {
        return NextResponse.json({ data: null }, { status: 400 });
    }
    
    const session = req.cookies.get("session")?.value;
    
    if (!session) {
        return NextResponse.json({ data: null }, { status: 401 });
    }
    
    const valid = jwtVerify(session, new TextEncoder().encode(process.env.JWT_SECRET!));
    
    if (!valid) {
        return NextResponse.json({ data: null }, { status: 401 });
    }
    
    const decoded = decodeJwt(session);
    const userId = decoded?.id;
    
    if (!userId) {
        return NextResponse.json({ data: null }, { status: 401 });
    }

    await dbConnect();

    const userBoard = await Board.findOne({ userId });
    
    if (userBoard) {
        userBoard.snapshot = JSON.stringify(snapshot);
        await userBoard.save();
        return NextResponse.json({ data: userBoard }, { status: 200 });
    }
    
    const board = new Board({ snapshot: JSON.stringify(snapshot), userId });
    await board.save();

    return NextResponse.json({ data: board }, { status: 200 });
}