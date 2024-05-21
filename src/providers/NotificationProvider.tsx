"use client";

import icons from "@/lib/icons";
import { AuthAtom } from "@/recoil/atoms/AuthAtom";
import { MutedAtom } from "@/recoil/atoms/MutedAtom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue } from "recoil";

export default function NotificationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);
    const [showNitificationDialog, setShowNitificationDialog] = useState(false);
    const azanAudioRef = useRef<HTMLAudioElement>(null);
    const muted = useRecoilValue(MutedAtom);
    const auth = useRecoilValue(AuthAtom);

    useEffect(() => {
        function urlBase64ToUint8Array(base64String: string) {
            const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, "+")
                .replace(/_/g, "/");

            const rawData = atob(base64);
            const outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }

            return outputArray;
        }

        async function subscribeUserToPush() {
            const registration = await navigator.serviceWorker.ready;
            const existingSubscription = await registration.pushManager.getSubscription();

            async function subscribe() {
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(
                        "BM3_O2yOw8fagx1dXUIYYmaJ5KYnxLOOWd9CC36gzoWo9w6ko_-VR-AIEkl-o1iv4kwGIzZMw1Oxndefy5iqa40"
                    ),
                });

                await fetch("/api/subscribe", {
                    method: "POST",
                    body: JSON.stringify({ subscription }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            }

            if (existingSubscription) {
                await fetch("/api/verify", {
                    method: "POST",
                    body: JSON.stringify({
                        endpoint: existingSubscription.endpoint,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((res) => {
                        if (!res.exists) {
                            existingSubscription.unsubscribe();
                            subscribe();
                        }
                    });
            }

            if (!existingSubscription) {
                subscribe();
            }
        }
        if (auth) {
            const permission = Notification.permission;

            if (permission === "default") {
                Notification.requestPermission().then(() => {
                    setShowNitificationDialog(true);
                })
            } else {
                setShowNitificationDialog(false);
            }

            if ("permissions" in navigator) {
                navigator.permissions
                    .query({ name: "notifications" })
                    .then(function (notificationPerm) {
                        notificationPerm.onchange = function () {
                            setShowNitificationDialog(false);
                        };
                    });
            } else {
                console.log("Notifications API not supported");
            }

            if ("serviceWorker" in navigator) {
                navigator.serviceWorker
                    .register("/service-worker.js")
                    .then(() => {
                        subscribeUserToPush();
                    })
                    .catch((error) => {
                        console.log(
                            "Service worker registration failed, error:",
                            error
                        );
                    });
            } else {
                console.log("Service worker not supported");
            }

        }
    }, [auth]);

    useEffect(() => {
        setMounted(true);
    }, []);

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
                                    onClick={() => setShowNitificationDialog(false)}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed top-0 flex-col gap-2 select-none cursor-pointer left-0 w-full h-full z-[99] bg-black/50 backdrop-blur-md flex items-center justify-center"
                                >
                                    <p className="text-center flex items-center gap-2 mb-5 px-3">
                                        {icons.bell} Allow Notifications to
                                        recieve prayer times on your desktop.
                                    </p>
                                    <p>
                                        Click here to hide
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
