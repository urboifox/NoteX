import { sendPrayerNotification } from '@/lib/notificationService';
import { getPrayerTimes } from '@/lib/prayerTimes';
import moment from 'moment-timezone';
import { NextResponse } from "next/server";
import cron from 'node-cron';



let scheduledJobs: { [key: string]: cron.ScheduledTask } = {};
export async function GET() {
    const prayerTimes = await getPrayerTimes();

    // Clear any previously scheduled jobs
    Object.values(scheduledJobs).forEach((job) => job.stop());
    scheduledJobs = {};

    const timezone = "Africa/Cairo";

    for (const [prayer, time] of Object.entries({ ...prayerTimes, Fajr: "11:00" })) {
        const [hours, minutes] = time.split(":").map(Number);

        // Convert prayer time to server's local time (Africa/Cairo timezone)
        const localTime = moment
            .tz(`${hours}:${minutes}`, "HH:mm", timezone)
            .local()
            .format("HH:mm");
        const [localHours, localMinutes] = localTime.split(":").map(Number);

        console.log('local minutes', localMinutes, 'local hours', localHours);

        const cronExpression = `${localMinutes} ${localHours} * * *`;

        scheduledJobs[prayer] = cron.schedule(cronExpression, () => {
            sendPrayerNotification(prayer as keyof PrayerTimesType, time);
            console.log(prayer, 'Notification sent from cron job at ', localTime);
        }, {
            timezone,
        });

        console.log(
            `Scheduled ${prayer} prayer notification at ${localTime} (server local time)`
        );
    }
    return NextResponse.json(
        { data: null, message: "Cron initialized" },
        { status: 200 }
    );
}
