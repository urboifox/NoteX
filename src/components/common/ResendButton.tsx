"use client";
import { useEffect, useState } from 'react';
import Button from './Button'

export default function ResendButton({ handleResend }: { handleResend: () => void }) {
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(timer - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    return (
        <Button disabled={timer > 0} onClick={handleResend} className="text-white inline ml-2 p-1 mt-4">
            Resend {timer > 0 ? `in (${timer})` : ''}
        </Button>
    )
}
