import { selector } from "recoil";
import { CurrentTimeAtom } from "../atoms/CurrentTimeAtom";

export const CurrentTimeStringSelector = selector({
    key: "CurrentTimeStringSelector",
    get: ({ get }) => {
      const time = get(CurrentTimeAtom);
      const date = new Date(time);

      // Get hours and minutes
      let hours: string | number = date.getHours();
      let minutes: string | number = date.getMinutes();

      // Pad with zero if necessary
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      // Return formatted time
      return `${hours}:${minutes}`;
    }
})