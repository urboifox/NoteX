'use client';

import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import AuthProvider from "./AuthProvider";

export default function Providers({ children, session }: { children: React.ReactNode, session: string }) {
  return (
    <>
      <RecoilRoot>
        <AuthProvider session={session}>
          <Toaster position="bottom-right" />
          {children}
        </AuthProvider>
      </RecoilRoot>
    </>
  )
}
