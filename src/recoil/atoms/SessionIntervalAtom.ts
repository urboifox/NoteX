import { atom } from "recoil";

export const SessionIntervalAtom = atom<null | NodeJS.Timeout>({
    key: "SessionIntervalAtom",
    default: null
})