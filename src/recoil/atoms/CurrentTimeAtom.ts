import { atom } from "recoil";

export const CurrentTimeAtom = atom({
    key: "CurrentTimeAtom",
    default: Date.now()
})