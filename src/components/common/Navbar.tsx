import Link from "next/link";
import Button from "./Button";
import { cookies } from "next/headers";
import UserProfileMenu from "./UserProfileMenu";
import icons from "@/lib/icons";

const links = [
    {
        label: "Home",
        href: "/",
        icon: icons.home
    },
    {
        label: "Diary",
        href: "/diary",
        icon: icons.diary
    },
]

export default function Navbar() {

    const session = cookies().get('session')?.value;

    return (
        <header className="container h-20 flex items-center justify-between">
            <Link href="/" className="font-extrabold flex text-2xl text-transparent w-max bg-clip-text bg-primary">
                NoteX
            </Link>

            <nav className="flex items-center gap-4">
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
