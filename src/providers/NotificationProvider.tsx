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
        // Function to handle incoming messages from service worker
        const handleMessage = (event: MessageEvent) => {
            console.log("Received message from service worker:", event.data);
            if (event.data.type === "AZAN" && azanAudioRef.current) {
                azanAudioRef.current.play();
            }
        };

        // Function to request notification permission and subscribe user to push notifications
        const requestNotificationPermission = async () => {
            try {
                const permission = await Notification.requestPermission();
                if (permission !== "granted") {
                    console.log("Permission not granted to send notifications");
                    return;
                }

                const registration = await navigator.serviceWorker.register("/service-worker.js");
                const existingSubscription = await registration.pushManager.getSubscription();

                if (!existingSubscription) {
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
                } else {
                    // If subscription exists, verify it with the server
                    await verifySubscription(existingSubscription);
                }

                // Add event listener for handling messages from service worker
                navigator.serviceWorker.addEventListener("message", handleMessage);
            } catch (error) {
                console.error("Error during notification setup:", error);
            }
        };

        // Function to verify subscription with the server
        const verifySubscription = async (subscription: PushSubscription) => {
            try {
                const response = await fetch("/api/verify", {
                    method: "POST",
                    body: JSON.stringify({
                        endpoint: subscription.endpoint,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                if (!data.exists) {
                    // If subscription does not exist on server, re-subscribe
                    await subscription.unsubscribe();
                    await requestNotificationPermission();
                }
            } catch (error) {
                console.error("Error verifying subscription:", error);
            }
        };

        // Helper function to convert base64 to Uint8Array
        const urlBase64ToUint8Array = (base64String: string) => {
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
        };

        // Main effect logic
        if (auth) {
            requestNotificationPermission().then(() => setMounted(true));
        }

        return () => {
            // Cleanup: remove message event listener when component unmounts
            navigator.serviceWorker.removeEventListener("message", handleMessage);
        };
    }, [auth]);

    return (
        <>
            {mounted &&
                createPortal(
                    <audio
                        muted={muted}
                        className="hidden"
                        src="/assets/azan.m4a"
                        ref={azanAudioRef}
                    />,
                    document.body
                )}

            {children}
        </>
    );
}
