import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryString() {
    const searchParams = useSearchParams();

      const appendQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set(name, value);

          return params.toString();
        },
        [searchParams]
      );

      const deleteQueryString = useCallback(
        (name: string) => {
          const params = new URLSearchParams(searchParams.toString());
          params.delete(name);

          return params.toString();
        },
        [searchParams]
      );

      const deleteQueryStrings = useCallback(
        (...names: string[]) => {
          const params = new URLSearchParams(searchParams.toString());
          names.forEach(name => params.delete(name));

          return params.toString();
        },
        [searchParams]
      );

      return {
        appendQueryString,
        deleteQueryStrings,
        deleteQueryString
      }
}

