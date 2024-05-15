import { selector } from "recoil";
import { AuthAtom } from "../atoms/AuthAtom";

export const IsLoggedIn = selector({
    key: "IsLoggedIn",
    get: ({ get }) => {
        const auth = get(AuthAtom);
        return auth.accessToken && auth.user;
    }
})

