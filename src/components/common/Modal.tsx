'use client';
import { createPortal } from "react-dom";
import {AnimatePresence, HTMLMotionProps, motion} from 'framer-motion';
import Button from "./Button";
import { cn } from "@/helpers/cn";
import { useEffect, useState } from "react";

type ModalProps = {
    className?: string;
    text: string;
    onSubmit: (e: React.MouseEvent) => void;
    onCancel?: () => void;
    visible?: boolean;
    submitText?: string;
    children?: React.ReactNode;
    loading?: boolean;
} & HTMLMotionProps<"div">;

export default function Modal({visible, loading, text, submitText, onSubmit, onCancel, className, children, ...props}: ModalProps) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [])

  return mounted && createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(2px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.15 }}
          {...props}
          className={cn(`fixed top-0 left-0 w-full h-full z-[99] bg-black/50 backdrop-blur-sm flex items-center justify-center`, className)}
        >
          <div className={`border border-white/10 rounded-md p-10 flex items-center flex-col backdrop-blur-sm max-w-[500px]`}>
            {text && <div className={`text-center mb-5 flex items-center gap-3 justify-center`}>{text}</div>}

            {
              children && (
                <div className={`mb-5`}>
                  {children}
                </div>
              )
            }

            <div className={`flex items-center gap-5`}>
              <Button onClick={onCancel}>Cancel</Button>
              <Button disabled={loading} className="text-red-600" onClick={onSubmit}>
                {loading ? "Loading..." : submitText || "Confirm"}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}