import { atom } from "recoil";

export const MutedAtom = atom<boolean>({
    key: "MutedAtom",
    default: false
})