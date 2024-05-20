'use client';

import { ARABIC_PRAYER_NAMES } from "@/constants";
import useNotification from "@/hooks/useNotification";
import icons from "@/lib/icons";
import { AuthAtom } from "@/recoil/atoms/AuthAtom";
import { CurrentTimeAtom } from "@/recoil/atoms/CurrentTimeAtom";
import { MutedAtom } from "@/recoil/atoms/MutedAtom";
import { CurrentTimeStringSelector } from "@/recoil/selectors/CurrentTimeStringSelector";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function NotificationProvider({ children }: { children: React.ReactNode }) {

    const [latestPrayer, setLatestPrayer] = useState('');
    const [mounted, setMounted] = useState(false);
    const [showNitificationDialog, setShowNitificationDialog] = useState(false);
    const [prayerTimes, setPrayerTimes] = useState({} as PrayerTimesType);
    const setCurrentTime = useSetRecoilState(CurrentTimeAtom);
    const currentTimeString = useRecoilValue(CurrentTimeStringSelector);
    const azanAudioRef = useRef<HTMLAudioElement>(null);
    const muted = useRecoilValue(MutedAtom);
    const auth = useRecoilValue(AuthAtom);

    const { notify } = useNotification();

    useEffect(() => {
        const permission = Notification.permission;

        if (permission === 'default') {
            Notification.requestPermission();
            setShowNitificationDialog(true);
        } else {
            setShowNitificationDialog(false);
        }

        if ('permissions' in navigator) {
          navigator.permissions
            .query({ name: "notifications" })
            .then(function (notificationPerm) {
              notificationPerm.onchange = function () {
                setShowNitificationDialog(false);
              };
            });
        }
    }, [])

    useEffect(() => {
        const getPrayerTimes = async () => {
            await fetch('https://api.aladhan.com/v1/timingsByCity?country=Egypt&city=Cairo').then((res) => res.json()).then((data) => {
                const newPrayerTimes: any = {};
                for (const [key] of Object.entries(ARABIC_PRAYER_NAMES)) {
                    newPrayerTimes[key] = data.data.timings[key];
                }
                setPrayerTimes(newPrayerTimes);
            })
        }

        getPrayerTimes();

        setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000)
    }, [setCurrentTime])

    
    useEffect(() => {
        for (const [key, value] of Object.entries(prayerTimes)) {
            if (value === currentTimeString && latestPrayer !== key && auth?.islamic && auth.islamicAzan) {
                console.log("notification !")
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
    }, [currentTimeString, prayerTimes, notify, latestPrayer, auth?.islamic, auth?.islamicAzan])

    useEffect(() => {
        setMounted(true);
    }, [])

    return (
        <>
            {mounted &&
                createPortal(
                    <>
                        <audio
                            muted={muted}
                            className="hidden"
                            src="/assets/azan.m4a"
                            ref={azanAudioRef}
                        />
                        <AnimatePresence>
                            {showNitificationDialog && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed top-0 left-0 w-full h-full z-[99] bg-black/50 backdrop-blur-sm flex items-center justify-center"
                                >
                                    <p className="text-center flex items-center gap-2 mb-5 px-3">
                                        {icons.bell} Allow Notifications to
                                        recieve prayer times on your desktop.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>,
                    document.body
                )}

            {children}
        </>
    );
}