import User from "@/models/userModel";
import { atom } from "recoil";

export const AuthAtom = atom<typeof User | null>({
    key: "AuthAtom",
    default: null
})