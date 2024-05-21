import dbConnect from "@/config/db";
import webpush from "@/lib/webPush";
import Subscription from "@/models/SubscriptionModel";
import { NextResponse } from "next/server";

export async function GET() {

    const payload = {
        title: "Notex",
        body: "Notification from Notex",
    }

    await dbConnect();

    const subscribers = await Subscription.find();

    const promises = subscribers.map((sub) => {
        return webpush.sendNotification(sub.value, JSON.stringify(payload))
    })

    Promise.allSettled(promises)
        .then(() => console.log("sent notifications"))
        .catch((err) => console.log(err))

    return NextResponse.json({ data: null }, { status: 200 })
}