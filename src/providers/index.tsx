'use client';

import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RecoilRoot>
        <Toaster position="bottom-right" />
        {children}
      </RecoilRoot>
    </>
  )
}
