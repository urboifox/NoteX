'use client';
import { cn } from "@/helpers/cn";
import { formatTime } from "@/helpers/formatTime";
import useEventListener from "@/hooks/useEventListener";
import icons from "@/lib/icons";
import { SessionIntervalAtom } from "@/recoil/atoms/SessionIntervalAtom";
import { SessionNameAtom } from "@/recoil/atoms/SessionNameAtom";
import { SessionPlayingAtom } from "@/recoil/atoms/SessionPlayingAtom";
import { SessionTimeAtom } from "@/recoil/atoms/SessionTimeAtom";
import { SessionVisibilityAtom } from "@/recoil/atoms/SessionVisibilityAtom";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Button from "../common/Button";
import Input from "../common/Input";
import Tooltip from "../common/Tooltip";
import SessionModal from "./SessionModal";

export default function SessionContent() {
  const [playing, setPlaying] = useRecoilState(SessionPlayingAtom);
  const [time, setTime] = useRecoilState(SessionTimeAtom);
  const [showModal, setShowModal] = useState(false);
  const [sessionName, setSessionName] = useRecoilState(SessionNameAtom);
  const [typing, setTyping] = useState(false);
  const [intervalAtom, setIntervalAtom] = useRecoilState(SessionIntervalAtom);
  const [sessionVisibility, setSessionVisibility] = useRecoilState(SessionVisibilityAtom);

  const startTimer = useCallback(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    setIntervalAtom(interval);
  }, [setTime, setIntervalAtom]);

  const stopTimer = useCallback(() => {
    clearInterval(intervalAtom as NodeJS.Timeout);
    setIntervalAtom(null);
  }, [intervalAtom, setIntervalAtom]);

  function handlePlay() {
    setPlaying(!playing);

    if (playing) {
      stopTimer();
    }
  }

  function handleReset() {
    setTime(0);
    setPlaying(false);
    stopTimer();
  }

  function handleStop() {
    setPlaying(false);
    stopTimer();
    setShowModal(true);
  }
  
  async function handleCloseModal(): Promise<void> {
    setShowModal(false);
    setTime(0);
    stopTimer();
    setSessionName('');
  }

  useEffect(() => {
    if (playing && !intervalAtom) {
      startTimer();
    }
  }, [playing, intervalAtom, startTimer]);

  useEffect(() => {
      function handleVisibilityChange(e: Event) {
        if (document.visibilityState === "hidden") {
          handleUserLeave();
        } else if (document.visibilityState === "visible") {
          handleUserReturn();
        }
      }

      function handleUserLeave() {
        if (playing) {
          clearInterval(intervalAtom as NodeJS.Timeout);
          setSessionVisibility((prev) => ({ ...prev, leave: Date.now() }))
        }
      }

      function handleUserReturn() {
        if (playing) {
          startTimer();
          setSessionVisibility((prev) => ({ ...prev, return: Date.now() }))
        }
      }
      document.addEventListener("visibilitychange", handleVisibilityChange);

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
  }, [intervalAtom, playing, setSessionVisibility, startTimer, sessionVisibility])

  useEffect(() => {
    if (sessionVisibility.leave && sessionVisibility.return && playing) {
      const differenceTime = Math.round((sessionVisibility.return - sessionVisibility.leave) / 1000);
      setTime(time + differenceTime);
      setSessionVisibility({ leave: 0, return: 0 });
    }
  }, [sessionVisibility.return, sessionVisibility.leave, playing, setTime, setSessionVisibility, time])
  
  function handleKeyDown(e: KeyboardEvent) {
    if (!typing && !showModal) {
      if (e.key === " ") {
        handlePlay();
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
          <div className="flex-1 pb-5 flex flex-col justify-center sm:justify-between gap-10 items-center">
              <div className="flex-col sm:flex-1 gap-10 flex items-center justify-center">
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

                  <Tooltip title="'Space'">
                      <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{
                              scale: 0.95,
                              transition: { duration: 0.1 },
                          }}
                          onClick={handlePlay}
                          onTap={handlePlay}
                          className="rounded-full cursor-pointer relative aspect-square w-32 sm:w-40 flex items-center justify-center bg-white overflow-hidden border-white border text-4xl"
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
                  </Tooltip>

                  <div className="flex items-center gap-5">
                      <Tooltip title="'R'">
                          <Button disabled={time <= 0} onClick={handleReset}>
                              {icons.reset}
                          </Button>
                      </Tooltip>
                      <Tooltip title="'S'">
                        <Button disabled={time <= 0} onClick={handleStop}>
                            {icons.stop}
                        </Button>
                      </Tooltip>
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
