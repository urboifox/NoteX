"use client";
import { AuthAtom } from "@/recoil/atoms/AuthAtom";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function LogoutPage() {
    const setAuth = useSetRecoilState(AuthAtom);
    const router = useRouter();

    useEffect(() => {
        setAuth(null);
        fetch("/api/logout", { credentials: "include" })
            .then(() => {
                router.push("/login");
            })
    }, [setAuth, router])

    return (
        <div className="w-full h-screen flex justify-center items-center">
            Logging out...
        </div>
    );
}
