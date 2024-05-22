import dbConnect from "@/config/db";
import webpush from "@/lib/webPush";
import Subscription from "@/models/SubscriptionModel";
import User from "@/models/userModel";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const searchParams = req.nextUrl.searchParams;
    const message = searchParams.get("message");
    const playAudio = searchParams.get("playAudio");

    if (!message) {
        return NextResponse.json({ data: null, message: "Message not found" }, { status: 400 });
    }

    await dbConnect();

    const session = cookies().get('session')?.value;
    
    if (!session) {
        return NextResponse.json({ data: null, message: "Not authorized" }, { status: 400 })
    }

    const decoded = decodeJwt(session);
    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user.isAdmin) {
        return NextResponse.json({ data: null, message: "Not authorized" }, { status: 401 })
    }

    const subscriptions = await Subscription.find();

    const subscribedUserIds = subscriptions.map((sub) => sub.userId);

    const users = await User.find({ _id: { $in: subscribedUserIds }, islamicAzan: true });

    const payload = JSON.stringify({
        title: "NoteX",
        body: message,
        icon: "/icon.png",
        data: {
            AZAN: playAudio === "true",
        }
    });

    const validSendNotificationPromises = subscriptions.map((subscription) => {
        const user = users.find((user) => user._id.toString() === subscription.userId);
        if (user) {
            return webpush.sendNotification(subscription.value, payload);
        }
        return null; // return null for subscriptions that don't match
    }).filter(Boolean); // filter out null values    

    try {
        const responses = await Promise.allSettled(validSendNotificationPromises);
        console.log(`Notifications sent. with message: ${message}. total: ${responses.length}`);

        // Extract endpoints that failed to send notifications
        const failedEndpoints = responses
            .filter((response) => response.status === "rejected")
            .map((response: any) => response.reason.endpoint);

        // Delete subscriptions associated with failed endpoints
        if (failedEndpoints.length > 0) {
            const result = await Subscription.deleteMany({
                "value.endpoint": { $in: failedEndpoints },
            });
            console.log(`${result.deletedCount} subscriptions deleted.`);
        }
    } catch (error) {
        console.error("Error sending notifications:", error);
    }

    return NextResponse.json({ data: null, message: "Notification sent" }, { status: 200 });
}