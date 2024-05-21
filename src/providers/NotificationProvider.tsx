"use client";

import { AuthAtom } from "@/recoil/atoms/AuthAtom";
import { MutedAtom } from "@/recoil/atoms/MutedAtom";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilValue } from "recoil";

export default function NotificationProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mounted, setMounted] = useState(false);
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

        const handleMessage = (event: MessageEvent) => {
            console.log('hi');
            if (event.data.type === "AZAN") {
                if (azanAudioRef.current) {
                    azanAudioRef.current.play();
                }
            }
        };

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
                }).catch((e) => console.log(e));
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
                    }).catch((e) => console.log(e));
            }

            if (!existingSubscription) {
                subscribe();
            }
        }
        if (auth) {
            Notification.requestPermission().then((permission) => {
                if (permission !== "granted") {
                    console.log("Permission not granted to send notifications");
                }
            })

            if ("permissions" in navigator) {
                navigator.permissions
                    .query({ name: "notifications" })
                    .then(function (notificationPerm) {
                        notificationPerm.onchange = function () {
                            // handle notification permission change
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
                
                navigator.serviceWorker.addEventListener("message", handleMessage);
            } else {
                console.log("Service worker not supported");
            }

        }

        return () => {
            navigator.serviceWorker.removeEventListener('message', handleMessage)
        };
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
                    </>,
                    document.body
                )}

            {children}
        </>
    );
}
