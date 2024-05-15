import dbConnect from "@/config/db";
import User from "@/models/userModel";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, { params }: { params: { userId: string } }) {
    dbConnect();

    const user = await User.findById(params.userId);

    if (!user) {
        return NextResponse.json({ data: null }, { status: 404 })
    }

    return NextResponse.json({ data: user }, { status: 200 })
}