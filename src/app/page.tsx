import Button from "@/components/common/Button";
import icons from "@/lib/icons";
import Link from "next/link";

const links = [
  {
    label: "Diaries",
    href: "/diary",
    icon: icons.diary,
  },
  {
    label: "Notes",
    href: "/notes",
    icon: icons.note,
  },
  {
    label: "Todos",
    href: "/todos",
    icon: icons.todo,
  },
  {
    label: "Session",
    href: "/session",
    icon: icons.clock,
  },
];

export default function Home() {
  return (
    <div className="container flex items-center justify-center h-[calc(100vh-80px)]">
      <div className="flex flex-col items-center gap-8 justify-center">
        <h1 className="text-4xl text-center font-light">What are you looking for?</h1>

        <ul className="flex justify-center items-center flex-wrap gap-4">
          {links.map((link) => (
            <li key={link.label}>
              <Link className="text-4xl" href={link.href}>
                <Button className="p-5" title={link.label}>
                  {link.icon}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
