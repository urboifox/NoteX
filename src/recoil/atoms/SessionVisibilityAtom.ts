import { atom } from "recoil";

export const SessionVisibilityAtom = atom({
    key: "SessionVisibilityAtom",
    default: {
        leave: 0,
        return: 0,
    }
})