import Link from "next/link";
import Button from "./Button";
import { cookies } from "next/headers";
import UserProfileMenu from "./UserProfileMenu";
import icons from "@/lib/icons";
import MusicButton from "./MusicButton";

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

export default function Navbar() {

    const session = cookies().get('session')?.value;

    return (
        <header className="container h-16 flex items-center justify-between">
            <Link href="/" className="font-extrabold select-none flex text-2xl text-transparent w-max bg-clip-text bg-primary">
                NoteX
            </Link>

            <nav className="flex items-center gap-3">
                <MusicButton />
                {
                    session ? (
                        <UserProfileMenu links={links} />
                    ) : (
                        <Link href="/login">
                            <Button>
                                Get Started
                            </Button>
                        </Link>
                    )
                }
            </nav>
        </header>
    )
}
