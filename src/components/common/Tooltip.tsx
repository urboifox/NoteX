'use client';

import { cn } from '@/helpers/cn';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";

type TooltipProps = {
    children: React.ReactElement;
    title: string;
}

export default function Tooltip({ children, title }: TooltipProps) {

    const timeout = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('top');

    function handleMouseEnter() {
        if (timeout.current) clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            setVisible(true);
        }, 700);
    }

    function handleMouseLeave() {
        if (timeout.current) clearTimeout(timeout.current);
        setVisible(false);
    }

    useEffect(() => {
        if (visible) {
            const container = containerRef.current;
            const tooltip = tooltipRef.current;
            if (container && tooltip) {
                const containerRect = container.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();

                if (containerRect.top < tooltipRect.height + 8) {
                    setPosition('bottom');
                } else {
                    setPosition('top');
                }
            }
        }
    }, [visible]);

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
        >
            {children}
            <AnimatePresence>
                {visible && (
                    <motion.div
                        ref={tooltipRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={cn("p-2 absolute text-xs left-1/2 -translate-x-1/2 backdrop-blur-sm rounded-md border-white/10 border bg-white/10", position === 'top' ? '-top-12' : '-bottom-12')}
                    >
                        {title}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
