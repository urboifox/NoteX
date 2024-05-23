'use client';
import icons from "@/lib/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";
import MusicButton from "./MusicButton";
import UserProfileMenu from "./UserProfileMenu";

const links = [
    {
        label: "Home",
        href: "/",
        icon: icons.home
    },
    {
        label: "Profile",
        href: "/profile",
        icon: icons.user
    },
    {
        label: "Blog",
        href: "/blog",
        icon: icons.pen
    },
    {
        label: "Todos",
        href: "/todos",
        icon: icons.todo
    },
    {
        label: "Session",
        href: "/session",
        icon: icons.clock
    }
]

export default function Navbar({ session }: { session: string }) {

    const pathname = usePathname();

    return (
        <header className="container h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
                {pathname === "/board" && (
                    <Link href={"/"}>
                        <Button className="text-sm">{icons.angleLeft}</Button>
                    </Link>
                )}
                <Link
                    href="/"
                    className="font-extrabold select-none flex text-2xl text-transparent w-max bg-clip-text bg-primary"
                >
                    NoteX
                </Link>
            </div>

            <nav className="flex items-center gap-3">
                <MusicButton />
                {session ? (
                    <UserProfileMenu links={links} />
                ) : (
                    <Link href="/login">
                        <Button>Get Started</Button>
                    </Link>
                )}
            </nav>
        </header>
    );
}
