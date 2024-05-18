'use client';
import { cn } from "@/helpers/cn";
import icons from "@/lib/icons";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import SessionModal from "./SessionModal";
import { formatTime } from "@/helpers/formatTime";
import Input from "../common/Input";
import useEventListener from "@/hooks/useEventListener";

export default function SessionContent() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (playing) {
      const interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playing, time]);

  useEffect(() => {
    if (stopped) {
      setShowModal(true);
    }
  }, [stopped]);

  
  
  function handlePlay() {
    setPlaying(!playing);
    if (stopped) {
      setTime(0);
      setStopped(false);
    }
  }
  
  function handleReset() {
    setTime(0);
    setPlaying(false);
  }

  function handleStop() {
    setPlaying(false);
    setStopped(true);
  }
  
  function handleCloseModal() {
    setShowModal(false);
    setTime(0)
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!typing) {
      if (e.key === " ") {
        setPlaying(!playing);
      } else if (e.key === "r" || e.key === "R") {
        handleReset();
      } else if (e.key === "s" || e.key === "S") {
        handleStop();
      }
    }
  }
  
  useEventListener('keydown', handleKeyDown)

  return (
    <>
      <SessionModal
        sessionName={sessionName}
        time={time}
        onClose={handleCloseModal}
        visible={showModal}
        />
      <div className="h-[calc(100vh-10rem)] w-full flex items-center justify-center">
        <div className="h-full flex flex-col gap-5 items-center">
          <div className="flex-1 flex-col gap-10 flex items-center justify-center">

            {
              playing ? (
                <div className={`w-max p-2 rounded-md border border-white/10 text-white/50 cursor-not-allowed`}>
                  {sessionName || "Anonymous"}
                </div>
              ) : (
                <Input
                  name="sessionName"
                  placeholder="Session Name"
                  onFocus={() => setTyping(true)}
                  onBlur={() => setTyping(false)}
                  onChange={(e) => setSessionName(e.target.value)}
                  value={sessionName}
                  className="transition-all duration-200"
                  disabled={playing}
                />
              )
            }

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              className="rounded-full relative aspect-square w-40 flex items-center justify-center bg-white overflow-hidden border-white border text-4xl"
            >
              <span
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full transition-all duration-300 ease-in-out bg-black",
                  playing ? "w-full h-full" : "w-0 h-0"
                )}
              />
              <span
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
                  playing ? "text-white" : "text-black"
                )}
              >
                {playing ? icons.pause : icons.play}
              </span>
            </motion.button>

            <div className="flex items-center gap-5">
              <Button disabled={stopped || time <= 0} onClick={handleReset}>
                {icons.reset}
              </Button>
              <Button disabled={!playing} onClick={handleStop}>
                {icons.stop}
              </Button>
            </div>
          </div>

          <time
            className={cn(
              "font-number text-2xl font-light transition-colors duration-200",
              playing ? "text-white" : "text-white/50"
            )}
          >
            {formatTime(time)}
          </time>
        </div>
      </div>
    </>
  );
}
