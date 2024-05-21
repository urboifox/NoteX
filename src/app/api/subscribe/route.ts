import dbConnect from "@/config/db";
import Subscription from "@/models/SubscriptionModel";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { subscription } = await req.json();

    if (!subscription) {
        return NextResponse.json({ message: "Subscription not found" }, { status: 400 });
    }

    await dbConnect();

    const session = cookies().get('session')?.value;

    if (!session) {
        return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    const decoded = decodeJwt(session);
    const userId = decoded?.id;

    const newSub = new Subscription({ userId, value: subscription });
    await newSub.save();
    
    return NextResponse.json({ message: "Subscription saved" }, { status: 200 });
}