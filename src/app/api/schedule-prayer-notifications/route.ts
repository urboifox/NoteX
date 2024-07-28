import { sendPrayerNotification } from '@/lib/notificationService';
import { getPrayerTimes } from '@/lib/prayerTimes';
import moment from 'moment-timezone';
import { NextResponse } from "next/server";
import cron from 'node-cron';

let scheduledJobs: { [key: string]: cron.ScheduledTask } = {};

export async function GET() {
    try {
        const prayerTimes = await getPrayerTimes();

        // Clear any previously scheduled jobs
        Object.values(scheduledJobs).forEach((job) => job.stop());
        scheduledJobs = {};

        const timezone = "Africa/Cairo";

        for (const [prayer, time] of Object.entries({ ...prayerTimes, Fajr: "11:00" })) {
            const [hours, minutes] = time.split(":").map(Number);

            if (isNaN(hours) || isNaN(minutes)) {
                console.error(`Invalid time for prayer ${prayer}: ${time}`);
                continue;
            }

            // Convert prayer time to server's local time (Africa/Cairo timezone)
            const localTime = moment.tz(`${hours}:${minutes}`, "HH:mm", timezone).local().format("HH:mm");
            const [localHours, localMinutes] = localTime.split(":").map(Number);

            if (isNaN(localHours) || isNaN(localMinutes)) {
                console.error(`Invalid local time for prayer ${prayer}: ${localTime}`);
                continue;
            }

            const cronExpression = `* * * * *`;
            console.log(`Scheduling ${prayer} with cron expression: ${cronExpression}`);

            scheduledJobs[prayer] = cron.schedule(cronExpression, () => {
                sendPrayerNotification(prayer as keyof PrayerTimesType, time);
                console.log(prayer, 'Notification sent from cron job at ', localTime);
            }, {
                timezone,
            });

            console.log(`Scheduled ${prayer} prayer notification at ${localTime} (server local time)`);
        }

        return NextResponse.json(
            { data: null, message: "Cron initialized" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error initializing cron jobs: ", error);
        return NextResponse.json(
            { data: null, message: "Error initializing cron jobs" },
            { status: 500 }
        );
    }
}