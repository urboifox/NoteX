'use client';

import { AZKAR } from "@/constants";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import icons from "@/lib/icons";

export default function IslamicAzkar({ visible = false }: { visible: boolean }) {

    const [index, setIndex] = useState(0);

    return (
        <AnimatePresence>
            {visible && (
                <div className="fixed w-max bottom-5 left-0 container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: visible ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIndex((i) => (i + 1) % AZKAR.length)}
                        className="p-3 flex items-center gap-2 select-none rounded-lg text-sm transition-colors duration-3000 cursor-pointer border border-white/10 backdrop-blur-md w-max"
                    >
                        {icons.click}
                        {AZKAR[index]}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
