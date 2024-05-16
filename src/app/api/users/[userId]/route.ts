import dbConnect from "@/config/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    await dbConnect();

    const user = await User.findById(params.userId);

    if (!user) {
        return NextResponse.json({ data: null }, { status: 404 })
    }

    return NextResponse.json({ data: user }, { status: 200 })
}