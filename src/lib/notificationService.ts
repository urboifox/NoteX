import Subscription from "@/models/SubscriptionModel";
import webpush from "./webPush";
import { ARABIC_PRAYER_NAMES } from "@/constants";
import dbConnect from "@/config/db";
import User from "@/models/userModel";

const sendPrayerNotification = async (prayer: string, time: string) => {
    await dbConnect();
    const subscriptions = await Subscription.find();

    const subscribedUserIds = subscriptions.map((sub) => sub.userId);

    const users = await User.find({ _id: { $in: subscribedUserIds }, islamicAzan: true });

    const payload = JSON.stringify({
        title: `${prayer} Prayer Time`,
        body: `لا حياة بدون صلاة، حان وقت صلاة ${
            ARABIC_PRAYER_NAMES[prayer as keyof typeof ARABIC_PRAYER_NAMES]
        }❤️ (${time})`,
        icon: "/icon.png",
        data: {
            AZAN: true,
        }
    });

    const sendNotificationPromises = subscriptions.map((subscription) => {
        if (users.some((user) => user._id.toString() === subscription.userId)) {
            return webpush.sendNotification(subscription.value, payload);
        }
    });

    try {
        const responses = await Promise.allSettled(sendNotificationPromises);
        console.log(`Notifications sent for ${prayer} prayer.`);

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
};

export { sendPrayerNotification };
