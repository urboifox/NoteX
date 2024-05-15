import Link from "next/link";
import Button from "./Button";

const links = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Articles",
        href: "/articles",
    },
]

export default function Navbar() {
  return (
    <header className="container h-20 flex items-center justify-between">
        <Link href="/" className="font-extrabold flex text-2xl text-transparent w-max bg-clip-text bg-primary">
            NoteX
        </Link>

        <nav className="flex items-center gap-4">
            <ul className="flex items-center gap-2">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="font-medium transition-colors duration-200 hover:text-gray-300 text-white">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <Link href="/login">
                <Button>
                    Get Started
                </Button>
            </Link>
        </nav>
    </header>
  )
}
