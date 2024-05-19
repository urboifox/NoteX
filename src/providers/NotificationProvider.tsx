'use client';

import { useEffect } from "react";

export default function NotificationProvider({ children }: { children: React.ReactNode }) {

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    return children;
}