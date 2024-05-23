import Button from "@/components/common/Button";
import Tooltip from "@/components/common/Tooltip";
import icons from "@/lib/icons";
import Link from "next/link";

const links = [
  {
    label: "Blog",
    href: "/blog",
    icon: icons.pen,
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
  {
    label: "White board",
    href: "/whiteboard",
    icon: icons.paint,
    disabled: true,
  },
  {
    label: "Notes",
    href: "/notes",
    icon: icons.note,
    disabled: true,
  },
  {
    label: "Schedule",
    href: "/schedule",
    icon: icons.calendar,
    disabled: true,
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
              <Tooltip keepVisible position="bottom" title={link.label}>
                <Link className="text-4xl" href={link.disabled ? '' : link.href}>
                  <Button disabled={link.disabled} className="p-5">
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
