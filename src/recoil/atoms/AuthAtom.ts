import User from "@/models/userModel";
import { atom } from "recoil";

export const AuthAtom = atom<typeof User>({
    key: "AuthAtom",
    default: {} as typeof User
})