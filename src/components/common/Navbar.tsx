import Link from "next/link";

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
    <header className="container py-6 flex items-center justify-between">
        <Link href="/" className="font-extrabold flex text-2xl text-transparent w-max bg-clip-text bg-primary">
            NoteX
        </Link>

        <nav>
            <ul className="flex items-center gap-2">
                {links.map((link) => (
                    <li key={link.label}>
                        <Link href={link.href} className="font-medium transition-colors duration-200 hover:text-gray-300 text-white">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    </header>
  )
}
