import Button from "@/components/common/Button";
import Tooltip from "@/components/common/Tooltip";
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
    label: "Schedule",
    href: "/schedule",
    icon: icons.calendar,
  },
  {
    label: "Session",
    href: "/session",
    icon: icons.clock,
  },
];

export default function Home() {
  return (
    <div className="container flex items-center justify-center h-[calc(100vh-5rem)]">
      <div className="flex flex-col items-center gap-8 justify-center">
        <h1 className="text-3xl sm:text-4xl text-center font-light select-none">What are you looking for?</h1>

        <ul className="flex justify-center items-center flex-wrap gap-4">
          {links.map((link) => (
            <li key={link.label}>
              <Tooltip position="bottom" title={link.label}>
                <Link className="text-4xl" href={link.href}>
                  <Button className="p-5">
                    {link.icon}
                  </Button>
                </Link>
              </Tooltip>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
