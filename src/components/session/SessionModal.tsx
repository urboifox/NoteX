'use client';
import { formatTime } from "@/helpers/formatTime";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal, useFormState, useFormStatus } from "react-dom";
import Button from "../common/Button";
import icons from "@/lib/icons";
import { saveSession } from "@/actions/sessionActions";
import toast from "react-hot-toast";

type SessionModalProps = {
  visible: boolean;
  onClose: () => void;
  time: number;
  sessionName?: string;
};

export default function SessionModal({ visible, onClose, time, sessionName }: SessionModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [state, formAction] = useFormState(saveSession, { success: false })

  useEffect(() => {
    if (state.success) {
        onClose();
        toast.success('Session saved');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success])

  return (
    mounted &&
    createPortal(
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col gap-10 items-center">
              <div className="text-white flex flex-col gap-5 items-center">
                <div className="text-center space-y-2">
                  <motion.p
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-4xl font-medium"
                  >
                    Great!
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-2xl font-light"
                  >
                    Your {sessionName} session duration was
                  </motion.p>
                </div>
                <motion.p
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-2xl font-number font-light"
                >
                  {formatTime(time)}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex items-center gap-5"
              >
                <Button
                  className="bg-red-600 hover:bg-red-500"
                  onClick={onClose}
                >
                  {icons.close} Close
                </Button>
                <form
                  action={(formData: FormData) => {
                    formData.append("time", time.toString());
                    sessionName && formData.append("sessionName", sessionName);
                    formAction(formData);
                  }}
                >
                  <SubmitButton />
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending}>{icons.save} {pending ? "Saving..." : "Save"}</Button>;
}

