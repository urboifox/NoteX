'use client';
import { cn } from "@/helpers/cn";
import icons from "@/lib/icons";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import SessionModal from "./SessionModal";
import { formatTime } from "@/helpers/formatTime";
import Input from "../common/Input";
import useEventListener from "@/hooks/useEventListener";
import { useRecoilState } from "recoil";
import { SessionPlayingAtom } from "@/recoil/atoms/SessionPlayingAtom";
import { SessionTimeAtom } from "@/recoil/atoms/SessionTimeAtom";
import { SessionIntervalAtom } from "@/recoil/atoms/SessionIntervalAtom";

export default function SessionContent() {
  const [playing, setPlaying] = useRecoilState(SessionPlayingAtom);
  const [time, setTime] = useRecoilState(SessionTimeAtom);
  const [stopped, setStopped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [typing, setTyping] = useState(false);
  const [intervalAtom, setIntervalAtom] = useRecoilState(SessionIntervalAtom);

  useEffect(() => {
    if (playing && !intervalAtom) {
      const interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);

      setIntervalAtom(interval);
    }
  }, [playing, time, setTime, intervalAtom, setIntervalAtom]);

  useEffect(() => {
    if (stopped) {
      setShowModal(true);
    }
  }, [stopped]);

  
  function clearIntervalAtom() {
      clearInterval(intervalAtom as NodeJS.Timeout);
      setIntervalAtom(null);
  }
  
  function handlePlay() {
    setPlaying(!playing);

    if (playing) {
      clearIntervalAtom();
    }

    if (stopped) {
      setTime(0);
      setStopped(false);
    }
  }
  
  function handleReset() {
    setTime(0);
    setPlaying(false);
    clearIntervalAtom();
  }

  function handleStop() {
    setPlaying(false);
    setStopped(true);
    clearIntervalAtom();
  }
  
  function handleCloseModal() {
    setShowModal(false);
    setTime(0);
    clearIntervalAtom();
    setSessionName('');
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!typing && !showModal) {
      if (e.key === " ") {
        setPlaying(!playing);
      } else if (e.key === "r" || e.key === "R") {
        handleReset();
      } else if (e.key === "s" || e.key === "S") {
        if (time > 0) {
          handleStop();
        }
      }
    }
  }
  
  useEventListener('keypress', handleKeyDown)

  return (
      <>
          <SessionModal
              sessionName={sessionName}
              time={time}
              onClose={handleCloseModal}
              visible={showModal}
          />
          <div className="flex-1 pb-5 flex justify-between flex-col gap-10 items-center">
              <div className="flex-1 flex-col gap-10 flex items-center justify-center">
                  {playing ? (
                      <div
                          className={`w-max p-2 rounded-md border border-white/10 text-white/50 cursor-not-allowed`}
                      >
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
                  )}

                  <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95, transition: { duration: .1 } }}
                      onClick={handlePlay}
                      onTap={handlePlay}
                      className="rounded-full cursor-pointer relative aspect-square w-40 flex items-center justify-center bg-white overflow-hidden border-white border text-4xl"
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
                  </motion.div>

                  <div className="flex items-center gap-5">
                      <Button
                          disabled={stopped || time <= 0}
                          onClick={handleReset}
                      >
                          {icons.reset}
                      </Button>
                      <Button disabled={time <= 0} onClick={handleStop}>
                          {icons.stop}
                      </Button>
                  </div>
              </div>

              <time
                  className={cn(
                      "font-number select-none text-2xl font-light transition-colors duration-200",
                      playing ? "text-white" : "text-white/50"
                  )}
              >
                  {formatTime(time)}
              </time>
          </div>
      </>
  );
}
