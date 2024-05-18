'use client';
import { AuthAtom } from "@/recoil/atoms/AuthAtom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

export default function AuthProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserResponse;
}) {
  const setAuth = useSetRecoilState(AuthAtom);

  useEffect(() => {
    if (user) {
      setAuth(user);
    }
  }, [user, setAuth]);

  return children;
}
