export const getPrayerTimes = async () => {
    const response = await fetch('https://api.aladhan.com/v1/timingsByCity?country=Egypt&city=Cairo');
    const data = await response.json();
    const timings = data.data.timings;

    return {
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
    };
};