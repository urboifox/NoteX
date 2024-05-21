import dbConnect from "@/config/db";
import Subscription from "@/models/SubscriptionModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { endpoint } = await req.json();

    
    if (!endpoint) {
        return NextResponse.json({ message: "Endpoint not found" }, { status: 400 });
    }
    
    await dbConnect();

    const subscription = await Subscription.findOne({ 'value.endpoint': endpoint });

    if (!subscription) {
        return NextResponse.json({ exists: false }, { status: 200 });
    } else {
        return NextResponse.json({ exists: true }, { status: 200 });
    }
}