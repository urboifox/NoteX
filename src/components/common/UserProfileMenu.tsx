'use client';
import icons from "@/lib/icons";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

export default function UserProfileMenu({ links }: {links: {label: string, href: string, icon: React.ReactNode}[]}) {

    const button = useRef<HTMLButtonElement>(null);
    const [visible, setVisible] = useState(false);

    useOutsideClick({
        ref: button,
        handler: () => setVisible(false)
    })

  return (
    <div className="relative">
        <Button className="text-xl p-2" ref={button} onClick={() => setVisible(!visible)}>
            {icons.user}
        </Button>
        <AnimatePresence>
            {
                visible && (
                    <motion.ul initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex overflow-hidden backdrop-blur-sm z-50 flex-col absolute right-0 top-12 bg-white/10 border border-white/10 rounded-md">
                        {links && links.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className="px-5 py-2 flex items-center gap-2 transition-colors duration-200 hover:bg-white/10">
                                    {link.icon}
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href={'/logout'} className="px-5 py-2 flex items-center gap-2 transition-colors duration-200 hover:bg-red-700">
                                {icons.logout}
                                Logout
                            </Link>
                        </li>
                    </motion.ul>
                )
            }
        </AnimatePresence>
    </div>
  )
}
