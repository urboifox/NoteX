'use client';

import { ARABIC_PRAYER_NAMES } from "@/constants";
import useNotification from "@/hooks/useNotification";
import { CurrentTimeAtom } from "@/recoil/atoms/CurrentTimeAtom";
import { MutedAtom } from "@/recoil/atoms/MutedAtom";
import { CurrentTimeStringSelector } from "@/recoil/selectors/CurrentTimeStringSelector";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function NotificationProvider({ children }: { children: React.ReactNode }) {

    const [latestPrayer, setLatestPrayer] = useState('');
    const [prayerTimes, setPrayerTimes] = useState({} as PrayerTimesType);
    const setCurrentTime = useSetRecoilState(CurrentTimeAtom);
    const currentTimeString = useRecoilValue(CurrentTimeStringSelector);
    const azanAudioRef = useRef<HTMLAudioElement>(null);
    const muted = useRecoilValue(MutedAtom);

    const { notify } = useNotification();

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        const getPrayerTimes = async () => {
            await fetch('https://api.aladhan.com/v1/timingsByCity?country=Egypt&city=Cairo').then((res) => res.json()).then((data) => {
                setPrayerTimes(data.data.timings);
            })
        }

        getPrayerTimes();

        setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000)
    }, [setCurrentTime])

    
    useEffect(() => {
        for (const [key, value] of Object.entries(prayerTimes)) {
            if (value === currentTimeString && latestPrayer !== key) {
                notify(`${key} Prayer Time`, {
                  body: `لا حياة بدون صلاة، حان موعد صلاة ${ARABIC_PRAYER_NAMES[key as keyof typeof ARABIC_PRAYER_NAMES]}❤️
                  ${value}`,
                });
                setLatestPrayer(key);
                if (azanAudioRef.current) {
                    azanAudioRef.current.play();
                }
            }
        }
    }, [currentTimeString, prayerTimes, notify, latestPrayer])

    return (
        <>
            <audio muted={muted} className="hidden" src="/assets/azan.m4a" ref={azanAudioRef} />
            {children}
        </>
    );
}