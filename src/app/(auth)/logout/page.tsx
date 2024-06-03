import { AuthAtom } from "@/recoil/atoms/AuthAtom";
import { useRouter } from "next/navigation"
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function LogoutPage() {
    const setAuth = useSetRecoilState(AuthAtom);
    const router = useRouter();

    useEffect(() => {
        setAuth(null);
        router.push("/login/clear");
    }, [setAuth, router])

    return null;
}
