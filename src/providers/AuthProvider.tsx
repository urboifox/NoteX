'use client';
import { AuthAtom } from "@/recoil/atoms/AuthAtom";
import { useEffect } from "react";
import * as jose from "jose";
import { useSetRecoilState } from "recoil";

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: string;
}) {
  const setAuth = useSetRecoilState(AuthAtom);

  useEffect(() => {
    async function fetchUser() {
      const decoded = jose.decodeJwt(session);
      const userId = decoded?.id;

      const res = await fetch(`/api/users/${userId}`);
      const json = await res.json();
      setAuth(json.data);
    }

    if (session) {
      fetchUser();
    }
  }, [session, setAuth]);

  return children;
}
