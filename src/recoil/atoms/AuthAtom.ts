import User from "@/models/userModel";
import { atom } from "recoil";

export const AuthAtom = atom<{
    accessToken?: string,
    user?: typeof User
}>({
    key: "AuthAtom",
    default: {
        accessToken: "",
        user: {} as typeof User
    }
})

