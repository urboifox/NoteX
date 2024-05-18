import { atom } from "recoil";

export const AuthAtom = atom<UserResponse | null>({
    key: "AuthAtom",
    default: null
})